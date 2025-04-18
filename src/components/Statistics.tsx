import { useMemo } from 'react';
import { JobApplication, JobStats } from '../types';
import { format } from 'date-fns';
import { BarChart, Activity } from 'lucide-react';

interface Props {
  jobs: JobApplication[];
}

export function Statistics({ jobs }: Props) {
  const stats: JobStats = useMemo(() => {
    const byStatus = jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byMonth = jobs.reduce((acc, job) => {
      const month = format(new Date(job.dateApplied), 'MMM yyyy');
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: jobs.length,
      byStatus,
      byMonth,
    };
  }, [jobs]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Activity className="w-6 h-6 text-indigo-600" />
        Application Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-indigo-500" />
            Status Breakdown
          </h3>
          <div className="space-y-2">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="capitalize">{status}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Monthly Applications</h3>
          <div className="space-y-2">
            {Object.entries(stats.byMonth).map(([month, count]) => (
              <div key={month} className="flex items-center justify-between">
                <span>{month}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}