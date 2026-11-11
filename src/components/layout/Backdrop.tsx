/** Fixed decorative background: a faded engineering grid and two static glows (no blur filter, no animation: both cost a full repaint per scroll frame). */
export default function Backdrop() {
    return (
        <div className="backdrop" aria-hidden="true">
            <div className="backdrop-grid" />
            <div className="backdrop-glow one" />
            <div className="backdrop-glow two" />
        </div>
    );
}
