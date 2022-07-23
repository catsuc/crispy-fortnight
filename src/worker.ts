import { CronJob } from 'cron'

const job = new CronJob(
  '0 8/24 * * *',
  () => {
    console.log(new Date().toString())
  },
  null,
  true
)

job.start();
