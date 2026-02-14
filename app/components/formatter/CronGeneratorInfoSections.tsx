export const CronGeneratorInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Cron Expression Generator - Create Crontab Schedules Online
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Generate cron expressions with our free online cron generator. Build crontab schedules
          visually, see human-readable explanations, preview next 5 execution times, and use 13
          common presets. Perfect for developers, DevOps engineers, and system administrators who
          need to schedule tasks, jobs, and automated scripts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Visual Builder</h3>
            <p className="text-sm text-muted-foreground">
              Build cron expressions with easy input fields for minute, hour, day, month, and
              weekday. No need to memorize syntax.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Human-Readable</h3>
            <p className="text-sm text-muted-foreground">
              See plain English explanation of your cron expression. Understand exactly when your
              job will run.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Next Runs Preview</h3>
            <p className="text-sm text-muted-foreground">
              Preview the next 5 execution times to verify your schedule matches expectations before
              deploying.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Why Use Our Cron Generator?</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Visual Cron Builder</h3>
            <p className="text-muted-foreground mb-4">
              Build cron expressions without memorizing syntax. Enter values in 5 fields (minute,
              hour, day of month, month, day of week) and see the cron expression generated
              instantly. Supports all standard cron syntax.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>5 input fields: minute (0-59), hour (0-23), day (1-31), month (1-12), weekday (0-6)</li>
              <li>Support for * (any value), */5 (every 5), 1-5 (range), 1,3,5 (list)</li>
              <li>Real-time validation and expression generation</li>
              <li>Clear range hints below each field</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Human-Readable Explanation</h3>
            <p className="text-muted-foreground mb-4">
              See plain English translation of your cron expression. No more guessing what
              &quot;0 */6 * * *&quot; means—it shows &quot;Every 6 hours&quot; instantly. Perfect
              for understanding and documenting schedules.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Instant plain English translation as you type</li>
              <li>Handles simple schedules (every minute, hourly, daily)</li>
              <li>Handles complex schedules (weekdays at specific times, monthly)</li>
              <li>Clear descriptions for ranges, steps, and lists</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Next 5 Execution Times</h3>
            <p className="text-muted-foreground mb-4">
              Preview when your cron job will actually run. See the next 5 execution times with full
              date and time. Catch scheduling mistakes before deploying to production.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Shows next 5 scheduled runs with full timestamps</li>
              <li>Updates in real-time as you edit the expression</li>
              <li>Verify your schedule matches expectations</li>
              <li>Catch timezone and daylight saving issues early</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">13 Common Presets</h3>
            <p className="text-muted-foreground mb-4">
              Start with pre-built cron expressions for common schedules. Click a preset to load it
              instantly, then customize as needed. Saves time and prevents syntax errors.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Every minute, 5/15/30 minutes, hourly, 6/12 hours</li>
              <li>Daily at midnight, 9 AM, 5 PM</li>
              <li>Every Monday at 9 AM, every Sunday at midnight</li>
              <li>First day of month at midnight</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Special Characters Explained</h3>
            <p className="text-muted-foreground mb-4">
              Understand cron special characters with in-app reference. See examples of * (any), */n
              (every n), ranges (1-5), and lists (1,3,5) with clear explanations.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>*</strong> - Any value (matches all)</li>
              <li><strong>*/5</strong> - Every 5 units (step values)</li>
              <li><strong>1-5</strong> - Range from 1 to 5</li>
              <li><strong>1,3,5</strong> - List of specific values</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How to Use the Cron Generator</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1. Use Presets or Build Custom</h3>
            <p className="text-muted-foreground">
              Start with a <strong>preset</strong> for common schedules (every hour, daily at 9 AM,
              etc.) or build from scratch. Click any preset to load it, then customize the fields
              below if needed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Set Each Field</h3>
            <p className="text-muted-foreground">
              Enter values for <strong>Minute</strong> (0-59), <strong>Hour</strong> (0-23),
              <strong>Day of Month</strong> (1-31), <strong>Month</strong> (1-12), and
              <strong>Day of Week</strong> (0-6, where 0=Sunday). Use * for &quot;any value&quot;.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. Use Special Characters</h3>
            <p className="text-muted-foreground">
              For <strong>every 5 minutes</strong>, use */5 in the minute field. For
              <strong>weekdays only</strong>, use 1-5 in day of week. For <strong>specific
              months</strong>, use 1,6,12 for Jan, Jun, Dec.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4. Verify with Next Runs</h3>
            <p className="text-muted-foreground">
              Check the <strong>Next 5 Executions</strong> section to see when your job will
              actually run. Make sure the times match your expectations before deploying.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">5. Copy and Deploy</h3>
            <p className="text-muted-foreground">
              Click <strong>Copy</strong> to copy the cron expression. Paste it into your crontab
              file, CI/CD config, or job scheduler. Use <code>crontab -e</code> on Linux/Mac to
              edit your crontab.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Perfect For...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">System Administrators</h3>
            <p className="text-sm text-muted-foreground">
              Schedule automated backups, log rotation, system updates, and maintenance tasks on
              Linux/Unix servers. Generate crontab entries for daily, weekly, or monthly jobs.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">DevOps Engineers</h3>
            <p className="text-sm text-muted-foreground">
              Configure CI/CD pipelines, automated deployments, health checks, and monitoring tasks.
              Use in Jenkins, GitLab CI, GitHub Actions, and Kubernetes CronJobs.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Backend Developers</h3>
            <p className="text-sm text-muted-foreground">
              Schedule data imports, email campaigns, report generation, and cleanup jobs. Use cron
              expressions in task schedulers like Celery, Sidekiq, Bull, or node-cron.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Database Administrators</h3>
            <p className="text-sm text-muted-foreground">
              Automate database backups, vacuum operations, index rebuilding, and data archival.
              Schedule SQL scripts and maintenance windows at off-peak hours.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What is a cron expression?
            </h3>
            <p className="text-muted-foreground">
              A cron expression is a string of 5 space-separated fields that define when a scheduled
              task should run. The format is: <code>minute hour day-of-month month day-of-week</code>.
              For example, <code>0 9 * * 1-5</code> means &quot;run at 9:00 AM on weekdays&quot;.
              Cron originated in Unix/Linux but is now used in many job schedulers and task queues.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What does each field in a cron expression mean?
            </h3>
            <p className="text-muted-foreground">
              The 5 fields are: <strong>Minute</strong> (0-59), <strong>Hour</strong> (0-23 in
              24-hour format), <strong>Day of Month</strong> (1-31), <strong>Month</strong> (1-12,
              where 1=Jan), and <strong>Day of Week</strong> (0-6, where 0=Sunday, 6=Saturday). Each
              field can use * for any value, */n for intervals, ranges like 1-5, or lists like 1,3,5.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How do I schedule a job to run every 5 minutes?
            </h3>
            <p className="text-muted-foreground">
              Use <code>*/5 * * * *</code>. The */5 in the minute field means &quot;every 5
              minutes&quot;. The remaining * fields mean every hour, every day, every month, and
              every day of the week. This will run at :00, :05, :10, :15, :20, :25, :30, :35, :40,
              :45, :50, and :55 past every hour.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How do I run a job only on weekdays?
            </h3>
            <p className="text-muted-foreground">
              Use 1-5 in the day of week field. For example, <code>0 9 * * 1-5</code> runs at 9:00
              AM Monday through Friday. Day of week uses 0=Sunday, 1=Monday, ... 6=Saturday, so 1-5
              is Monday to Friday. You can also use specific days like <code>1,3,5</code> for
              Monday, Wednesday, Friday only.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What&apos;s the difference between day of month and day of week?
            </h3>
            <p className="text-muted-foreground">
              <strong>Day of month</strong> (field 3) is the calendar date (1-31), like &quot;run on
              the 1st and 15th&quot;. <strong>Day of week</strong> (field 5) is the weekday (0-6),
              like &quot;run on Monday and Friday&quot;. If both are specified (not *), the job runs
              when EITHER condition is true (OR logic), not both (AND logic). Usually you set one to
              * and use the other.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Can I use cron expressions in cloud platforms?
            </h3>
            <p className="text-muted-foreground">
              Yes! Most cloud platforms support cron expressions: <strong>AWS EventBridge</strong>
              (uses 6-field cron with seconds), <strong>Google Cloud Scheduler</strong> (standard
              5-field cron), <strong>Azure Logic Apps</strong> (uses recurrence expressions),
              <strong>Kubernetes CronJobs</strong> (standard 5-field cron), and CI/CD tools like
              <strong>GitHub Actions</strong>, <strong>GitLab CI</strong>, and
              <strong>Jenkins</strong>. Check your platform&apos;s documentation for any variations.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Cron Expression Best Practices</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Test before deploying:</strong> Use the next
                runs preview to verify your schedule. A typo can cause jobs to run too frequently or
                not at all.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Avoid overlapping jobs:</strong> If a job takes
                1 hour to run, don&apos;t schedule it every 30 minutes. Ensure jobs finish before
                the next execution.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use off-peak hours:</strong> Schedule
                resource-intensive jobs (backups, reports) during low-traffic hours like 2-4 AM.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Document your cron jobs:</strong> Add comments
                in crontab files explaining what each job does and why it runs at that time.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Monitor job execution:</strong> Set up logging
                and alerting to detect when cron jobs fail or don&apos;t run as expected.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Consider timezones:</strong> Cron runs in the
                server&apos;s timezone. If your server is in UTC but users are in EST, adjust
                schedules accordingly.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
