import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TimeSinceQuitSmoking: React.FC = () => {
    // תאריך הפסקת עישון (מתעדכן גם בעת איפוס)
    const [quitDate, setQuitDate] = useState(() => {
        const saved = localStorage.getItem("quitDate");
        return saved ? new Date(saved) : new Date("2025-10-17T18:10:00+03:00");
    });

    const [timePassed, setTimePassed] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date().getTime();
            const diff = now - quitDate.getTime();

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimePassed({ days, hours, minutes, seconds });

            if (days < 7) setMessage("התחלה מצוינת! כל יום נוסף הוא ניצחון קטן 💪");
            else if (days < 14) setMessage("אתה כבר שבוע שלם לא מעשן - כל הכבוד!👏");
            else if (days < 30) setMessage("כבר עברו כמה שבועות – הגוף שלך מתחיל להתנקות 👃");
            else if (days < 60) setMessage("מעל חודש! הגוף שלך כבר נושם טוב יותר 🫁");
            else if (days < 180) setMessage("כמה חודשים זה כבר זמן משמעותי!🔥");
            else if (days < 365) setMessage("למעלה מחצי שנה בלי עישון – זה כבר אורח חיים חדש 🌿");
            else if (days < 730) setMessage("איזה הישג! כבר למעלה משנה בלי סיגריות ❤️");
            else setMessage("עברו למעלה משנתיים מאז שהפסקת לעשן – אתה השראה לאחרים 🌟");
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [quitDate]);

    const handleReset = () => setShowPopup(true);

    const confirmReset = () => {
        const now = new Date();
        setQuitDate(now);
        localStorage.setItem("quitDate", now.toISOString());
        setShowPopup(false);
    };

    return (
        <div style={styles.container}>
            <motion.h1
                style={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                יוני, עברו מאז שהתחלת לעשן:
            </motion.h1>

            <motion.div
                style={styles.timer}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <TimeUnit value={timePassed.days} label="ימים" />
                <TimeUnit value={timePassed.hours} label="שעות" />
                <TimeUnit value={timePassed.minutes} label="דקות" />
                <TimeUnit value={timePassed.seconds} label="שניות" />
            </motion.div>

            <motion.div
                style={styles.message}
                key={message}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {message}
            </motion.div>

            <button onClick={handleReset} style={styles.resetButton}>איפוס הטיימר</button>

            {showPopup && (
                <div style={styles.popupBackdrop}>
                    <motion.div
                        style={styles.popup}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <p>האם אתה בטוח שברצונך לאפס את הטיימר לעכשיו?</p>
                        <div style={styles.popupButtons}>
                            <button onClick={confirmReset} style={styles.confirmBtn}>כן</button>
                            <button onClick={() => setShowPopup(false)} style={styles.cancelBtn}>לא</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <motion.div
        style={styles.unit}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
    >
        <span style={styles.number}>{value}</span>
        <span style={styles.label}>{label}</span>
    </motion.div>
);

const styles: Record<string, React.CSSProperties> = {
    container: {
        textAlign: "center",
        fontFamily: "Rubik, sans-serif",
        padding: "2rem",
        background: "linear-gradient(135deg, #fff0f0, #ffe5b4)",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        width: "fit-content",
        margin: "3rem auto",
    },
    title: {
        marginBottom: "1.5rem",
        fontSize: "1.8rem",
        color: "#333",
    },
    timer: {
        display: "flex",
        justifyContent: "center",
        gap: "1.5rem",
        marginBottom: "1.5rem",
    },
    unit: {
        textAlign: "center",
        padding: "1rem",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        minWidth: "80px",
    },
    number: {
        display: "block",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#d35400",
    },
    label: {
        fontSize: "1rem",
        color: "#555",
    },
    message: {
        fontSize: "1.2rem",
        fontWeight: 500,
        color: "#2c3e50",
    },
    resetButton: {
        marginTop: "1rem",
        padding: "0.7rem 1.4rem",
        fontSize: "1rem",
        background: "#d35400",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
    },
    popupBackdrop: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    popup: {
        background: "white",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        textAlign: "center",
        width: "300px",
        fontFamily: "Rubik, sans-serif",
    },
    popupButtons: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "1rem",
    },
    confirmBtn: {
        background: "#27ae60",
        color: "white",
        border: "none",
        padding: "0.6rem 1.2rem",
        borderRadius: "8px",
        cursor: "pointer",
    },
    cancelBtn: {
        background: "#c0392b",
        color: "white",
        border: "none",
        padding: "0.6rem 1.2rem",
        borderRadius: "8px",
        cursor: "pointer",
    },
};

export default TimeSinceQuitSmoking;