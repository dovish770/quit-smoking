import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TimeSinceQuitSmoking: React.FC = () => {
    // 🔧 תאריך הפסקת עישון (שנה לפי הצורך)
    const quitDate = new Date("2025-10-17T18:10:00+03:00");

    const [timePassed, setTimePassed] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [message, setMessage] = useState("");

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
            else if (days < 180) setMessage(" כמה חודשים זה כבר זמן משמעותי!🔥");
            else if (days < 365) setMessage("למעלה מחצי שנה בלי עישון – זה כבר אורח חיים חדש 🌿");
            else if (days < 730) setMessage("איזה הישג! כבר למעלה משנה בלי סיגריות ❤️");
            else setMessage("עברו למעלה משנתיים מאז שהפסקת לעשן – אתה השראה לאחרים 🌟");
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [quitDate]);

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
        </div>
    );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({
    value,
    label,
}) => (
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
};

export default TimeSinceQuitSmoking;