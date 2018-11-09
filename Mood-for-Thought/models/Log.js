const createLog = (time, mood = null) => ({
    mood,
    time,
    activities: [],
});

export default createLog;
