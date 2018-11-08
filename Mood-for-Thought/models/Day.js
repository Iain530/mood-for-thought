import StepService from '../services/step-service';
import createSleep from './Sleep';


const createDay = async (date) => ({
    logs: [],
    steps: await StepService.getStepsForDate(date),
    sleep: createSleep(),
    date,
});

export default createDay;
