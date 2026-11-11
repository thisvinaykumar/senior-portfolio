/**
 * Blueprint centrepiece: two systems drawn from their code.
 * Via-Ferry facts checked against BE-Via-Ferry (helper/booking-settlement.helper.js,
 * retrieve-poller.helper.js, payment-flow.helper.js); OpsX facts from IMS-SASS.
 * No client or tenant names (NDA).
 *
 * Geometry is in a 1000-wide viewBox; nodes are 170 × 64 unless h is given.
 */
export type NodeKind = "step" | "money" | "ok" | "fail" | "aside";
export type Pt = [number, number];

export interface BpNode {
  id: string;
  x: number; // centre
  y: number; // centre
  h?: number;
  kind: NodeKind;
  title: string;
  sub: string;
  lines?: string[]; // extra lines for tall nodes
  detail: string[];
}

export interface BpEdge {
  id: string;
  points: Pt[];
  label?: { text: string; x: number; y: number; anchor?: "start" | "middle" | "end" };
  dashed?: boolean;
}

export interface BpScenario {
  id: string;
  label: string;
  tone: "cyan" | "amber" | "green" | "rose";
  summary: string;
  route: Pt[]; // the packet's path, through node centres
  edges: string[]; // edges lit while this scenario runs
}

export interface BpFlow {
  id: string;
  tab: string;
  title: string;
  lead: string;
  height: number;
  nodes: BpNode[];
  edges: BpEdge[];
  scenarios: BpScenario[];
}

export const blueprintIntro = {
  eyebrow: "Blueprint",
  heading: "Two systems, drawn from the code",
  lead: "Pick a scenario to send a packet through the system, or click any box to see how that step works.",
  hint: "Swipe sideways to see the whole diagram.",
  scenarioLabel: "Scenario",
  detailEmpty: "Click a box in the diagram to see how that step works.",
};

const viaFerry: BpFlow = {
  id: "via-ferry",
  tab: "Via-Ferry booking",
  title: "Via.com ferry booking — a state machine that survives timeouts, crashes and races",
  lead: "Via gives no webhook, a book call can time out after the seat was sold, and the wallet has no hold. Every step is a compare-and-set on the booking, so only one caller ever moves it forward.",
  height: 470,
  nodes: [
    { id: "search", x: 105, y: 80, kind: "step", title: "Search + review", sub: "SEARCHED → REVIEWED",
      detail: ["Search takes 15–25 seconds at the supplier, so the server's request timeout is 5 minutes and keep-alive sits above the AWS load balancer's 60-second idle timeout."] },
    { id: "block", x: 300, y: 80, kind: "step", title: "Seat block", sub: "hold the seats",
      detail: ["BLOCK_REQUESTED → BLOCKED. A retry on the same session reuses an existing block; a request younger than 3 minutes answers \"in progress\"; an older one is retired to BLOCK_FAILED."] },
    { id: "claim", x: 495, y: 80, kind: "step", title: "Atomic claim", sub: "compare-and-set",
      detail: ["BLOCKED → PAYMENT_IN_PROGRESS with a conditional findOneAndUpdate. Two concurrent payments race here and only the winner continues — no Mongo transaction needed."] },
    { id: "debit", x: 690, y: 80, kind: "money", title: "Wallet debit", sub: "debit exactly once",
      detail: ["If the wallet refuses, the booking is handed back to BLOCKED. If the debit's outcome is unknown, the booking is flagged for manual review and never retried — a retry could charge twice.", "A replay after success returns the same booking."] },
    { id: "arm", x: 885, y: 80, kind: "step", title: "Arm polling", sub: "lease before book",
      detail: ["The polling window (deadline, owner, lease) is written before the book call. If the process dies mid-request, the booking is settled by retrieving its status — never by booking again."] },
    { id: "book", x: 885, y: 250, kind: "step", title: "Book with Via", sub: "may time out",
      detail: ["BOOKING_IN_PROGRESS. \"No response\" is classified as a timeout or reset, not as a rejection, because Via may have sold the seat anyway."] },
    { id: "poll", x: 690, y: 250, kind: "step", title: "Retrieve poller", sub: "10 s · 10 min window",
      detail: ["PENDING_CONFIRMATION. Every 10 seconds, for up to 10 minutes, a tick claims a 60-second lease (owner = host:pid:id), calls retrieve and settles the booking if Via has an answer.", "Settling is guarded so the book path, the poller and a manual refresh can race safely."] },
    { id: "restart", x: 495, y: 250, kind: "aside", title: "Restart recovery", sub: "adopts lapsed leases",
      detail: ["On startup and every minute, the service adopts polling windows whose leases have lapsed — so polling survives restarts and works across several instances."] },
    { id: "booked", x: 885, y: 420, kind: "ok", title: "BOOKED", sub: "email sent once",
      detail: ["Final. The confirmation email is claimed with an \"emailSent is not true\" condition, so it goes out exactly once even if two paths settle together."] },
    { id: "reverse", x: 690, y: 420, kind: "money", title: "Auto reversal", sub: "DEBITED → REVERSED",
      detail: ["Only on a definite rejection: the deduction is claimed DEBITED → REVERSING, credited back, then marked REVERSED. A gateway payment is flagged for a manual refund instead."] },
    { id: "review", x: 290, y: 420, kind: "fail", title: "Manual review", sub: "never auto-retried",
      detail: ["Three ways in: an unknown debit outcome, a reversal that fails, or a window that expires with no answer (UNRESOLVED).", "UNRESOLVED leaves the money where it is — Via may still have charged — and stays open, so a later status check can still settle it."] },
  ],
  edges: [
    { id: "e-search-block", points: [[190, 80], [215, 80]] },
    { id: "e-block-claim", points: [[385, 80], [410, 80]] },
    { id: "e-claim-debit", points: [[580, 80], [605, 80]] },
    { id: "e-debit-arm", points: [[775, 80], [800, 80]] },
    { id: "e-arm-book", points: [[885, 112], [885, 218]] },
    { id: "e-book-poll", points: [[800, 250], [775, 250]] },
    { id: "e-book-booked", points: [[905, 282], [905, 388]], label: { text: "confirmed", x: 913, y: 340 } },
    { id: "e-poll-booked", points: [[760, 282], [760, 335], [840, 335], [840, 388]], label: { text: "confirmed later", x: 800, y: 327, anchor: "middle" } },
    { id: "e-poll-reverse", points: [[690, 282], [690, 388]], label: { text: "rejected", x: 698, y: 372 } },
    { id: "e-poll-review", points: [[640, 282], [640, 335], [330, 335], [330, 388]], label: { text: "window expired", x: 485, y: 327, anchor: "middle" } },
    { id: "e-debit-review", points: [[690, 112], [690, 165], [250, 165], [250, 388]], label: { text: "debit outcome unknown", x: 470, y: 157, anchor: "middle" } },
    { id: "e-reverse-review", points: [[605, 420], [375, 420]], label: { text: "reversal failed", x: 490, y: 412, anchor: "middle" } },
    { id: "e-restart-poll", points: [[580, 250], [605, 250]], dashed: true },
  ],
  scenarios: [
    { id: "happy", label: "Booked", tone: "green",
      summary: "Claim, debit once, arm polling, book; the poller sees CONFIRMED and the booking settles with one email.",
      route: [[105, 80], [885, 80], [885, 250], [690, 250], [760, 250], [760, 335], [840, 335], [840, 420]],
      edges: ["e-search-block", "e-block-claim", "e-claim-debit", "e-debit-arm", "e-arm-book", "e-book-poll", "e-poll-booked"] },
    { id: "rejected", label: "Supplier rejects", tone: "amber",
      summary: "Via rejects the booking after the wallet was debited, so the debit is claimed and credited back automatically.",
      route: [[105, 80], [885, 80], [885, 250], [690, 250], [690, 420]],
      edges: ["e-search-block", "e-block-claim", "e-claim-debit", "e-debit-arm", "e-arm-book", "e-book-poll", "e-poll-reverse"] },
    { id: "unknown", label: "Unknown debit", tone: "rose",
      summary: "The wallet call fails without a clear answer. Retrying could charge twice, so the booking is parked for a person.",
      route: [[105, 80], [690, 80], [690, 165], [250, 165], [250, 420]],
      edges: ["e-search-block", "e-block-claim", "e-claim-debit", "e-debit-review"] },
    { id: "expired", label: "Window expires", tone: "rose",
      summary: "Ten minutes pass with no final status. Nothing is refunded automatically — the booking goes UNRESOLVED and to review.",
      route: [[105, 80], [885, 80], [885, 250], [690, 250], [640, 250], [640, 335], [330, 335], [330, 420]],
      edges: ["e-search-block", "e-block-claim", "e-claim-debit", "e-debit-arm", "e-arm-book", "e-book-poll", "e-poll-review"] },
    { id: "restart", label: "Server restarts", tone: "cyan",
      summary: "The instance dies mid-poll. Another one adopts the lapsed lease and finishes polling — no booking is lost or repeated.",
      route: [[495, 250], [690, 250], [760, 250], [760, 335], [840, 335], [840, 420]],
      edges: ["e-restart-poll", "e-poll-booked"] },
  ],
};

const opsxLedger: BpFlow = {
  id: "opsx-ledger",
  tab: "OpsX outbox ledger",
  title: "OpsX — from an operational write in MongoDB to a balanced ledger in PostgreSQL",
  lead: "Payroll and stock live in MongoDB; the books live in PostgreSQL. A transactional outbox and an idempotent consumer give effectively-once posting — at-least-once delivery, made safe by unique keys.",
  height: 400,
  nodes: [
    { id: "req", x: 105, y: 80, kind: "step", title: "Request", sub: "key from dialog open",
      detail: ["The client mints the idempotency key when the dialog opens, not per HTTP call — so a double click or a network retry carries the same key."] },
    { id: "idem", x: 300, y: 80, kind: "step", title: "Idempotency claim", sub: "unique {tenant, key}",
      detail: ["@Idempotent() on 34 routes. The claim is a row with a unique {tenantId, key} index and a TTL, and the request body's fingerprint must match.", "The claim sits outside the business transaction, so it survives a rollback."] },
    { id: "uow", x: 495, y: 80, kind: "money", title: "Unit of work", sub: "write + outbox row",
      detail: ["One Mongo transaction with an ambient session: the business write and a financeOutbox row commit together or not at all.", "A tenant-scope plugin pins every query and write to the tenant and bans $lookup."] },
    { id: "worker", x: 690, y: 80, kind: "step", title: "Outbox worker", sub: "every minute, serial",
      detail: ["Drains the outbox every minute with concurrency 1. Delivery is at-least-once: a crash after posting means the same event is sent again."] },
    { id: "pg", x: 885, y: 80, kind: "money", title: "Postgres ledger", sub: "unique source_event_id",
      detail: ["Double-entry general ledger. A partial unique index on source_event_id makes posting idempotent."] },
    { id: "retry", x: 300, y: 250, kind: "aside", title: "Same key again", sub: "409 or stored replay",
      detail: ["Repeat while the first is in flight → 409. Repeat after it completed → the stored result is replayed. If the request failed, the key is freed."] },
    { id: "rollback", x: 495, y: 250, kind: "fail", title: "Txn rolls back", sub: "no row · key freed",
      detail: ["If the business write fails, the outbox row never exists, so nothing reaches the ledger — and the idempotency key is released for a clean retry."] },
    { id: "guards", x: 690, y: 290, h: 144, kind: "ok", title: "Ledger guards", sub: "enforced in Postgres",
      lines: ["balanced at COMMIT", "BIGINT paise", "append-only", "closed periods", "tenant RLS"],
      detail: ["A deferrable trigger checks every entry balances at COMMIT. Money is BIGINT paise, debit XOR credit. No UPDATE or DELETE — corrections are reversals. Closed periods refuse postings.", "Row-level security uses SET LOCAL app.tenant_id, and the app role is NOSUPERUSER NOBYPASSRLS — the app refuses to boot otherwise, because RLS does nothing under a superuser."] },
    { id: "dup", x: 885, y: 250, kind: "aside", title: "Duplicate delivery", sub: "unique index → no-op",
      detail: ["The same event arrives twice. The unique source_event_id index rejects the second insert, so the ledger posts it once."] },
  ],
  edges: [
    { id: "o-req-idem", points: [[190, 80], [215, 80]] },
    { id: "o-idem-uow", points: [[385, 80], [410, 80]] },
    { id: "o-uow-worker", points: [[580, 80], [605, 80]] },
    { id: "o-worker-pg", points: [[775, 80], [800, 80]] },
    { id: "o-idem-retry", points: [[300, 112], [300, 218]], label: { text: "same key", x: 308, y: 170 } },
    { id: "o-uow-rollback", points: [[495, 112], [495, 218]], label: { text: "error", x: 503, y: 170 } },
    { id: "o-pg-guards", points: [[830, 112], [830, 165], [690, 165], [690, 218]], label: { text: "posted", x: 760, y: 157, anchor: "middle" } },
    { id: "o-pg-dup", points: [[920, 112], [920, 218]], label: { text: "redelivered", x: 928, y: 170 } },
  ],
  scenarios: [
    { id: "posted", label: "Posted once", tone: "green",
      summary: "Claim the key, commit the write and its outbox row together, drain, post — and Postgres checks the entry balances.",
      route: [[105, 80], [830, 80], [830, 165], [690, 165], [690, 290]],
      edges: ["o-req-idem", "o-idem-uow", "o-uow-worker", "o-worker-pg", "o-pg-guards"] },
    { id: "double-click", label: "Double click", tone: "cyan",
      summary: "The same key arrives twice. The second request gets a 409 while the first runs, or its stored result after.",
      route: [[105, 80], [300, 80], [300, 250]],
      edges: ["o-req-idem", "o-idem-retry"] },
    { id: "rollback", label: "Write fails", tone: "rose",
      summary: "The transaction rolls back, so no outbox row exists and nothing reaches the books. The key is freed.",
      route: [[105, 80], [495, 80], [495, 250]],
      edges: ["o-req-idem", "o-idem-uow", "o-uow-rollback"] },
    { id: "redelivery", label: "Redelivery", tone: "amber",
      summary: "The worker crashes after posting and sends the event again. The unique index turns the second post into a no-op.",
      route: [[690, 80], [920, 80], [920, 250]],
      edges: ["o-worker-pg", "o-pg-dup"] },
  ],
};

export const flows: BpFlow[] = [viaFerry, opsxLedger];
