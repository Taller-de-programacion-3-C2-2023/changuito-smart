import { SCRAP } from './configs.js'
import { Cron } from "croner";
import { scrap } from './scrap.js'

const job = Cron(SCRAP.CRON_DATE, {}, () => {
	scrap();
});
