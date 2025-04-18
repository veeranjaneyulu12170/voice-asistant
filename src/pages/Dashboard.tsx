import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Plus, Trash2, Building2, Calendar, Link, MessageSquare, BriefcaseIcon, Search, Filter, SortAsc, Mail, ArrowLeft } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import type { JobApplication, JobStatus, Interview, Attachment } from '../types';
import { ThreeBackground } from '../components/ThreeBackground';
import { Statistics } from '../components/Statistics';
import { motion } from 'framer-motion';

export function Dashboard() {
  const [jobs, setJobs] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('jobApplications');
    return saved ? JSON.parse(saved) : [];
  });

  const [newJob, setNewJob] = useState({
    company: '',
    position: '',
    notes: '',
    url: '',
    salary: '',
    location: '',
  });

  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
  });

  const [sortBy, setSortBy] = useState<'date' | 'company'>('date');

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
  }, [jobs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const job: JobApplication = {
      id: crypto.randomUUID(),
      ...newJob,
      status: 'applied',
      dateApplied: new Date().toISOString(),
      interviews: [],
      attachments: [],
      reminders: [],
    };
    setJobs([job, ...jobs]);
    setNewJob({ company: '', position: '', notes: '', url: '', salary: '', location: '' });
  };

  const updateStatus = (id: string, status: JobStatus) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status } : job
    ));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const addInterview = (jobId: string, interview: Omit<Interview, 'id'>) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            interviews: [...job.interviews, { ...interview, id: crypto.randomUUID() }] 
          }
        : job
    ));
  };

  const addAttachment = (jobId: string, attachment: Omit<Attachment, 'id'>) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            attachments: [...job.attachments, { ...attachment, id: crypto.randomUUID() }] 
          }
        : job
    ));
  };

  const addReminder = (jobId: string, reminder: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            reminders: [...job.reminders, reminder] 
          }
        : job
    ));
  };

  const filteredJobs = jobs
    .filter(job => 
      (filters.status === 'all' || job.status === filters.status) &&
      (filters.search === '' || 
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.position.toLowerCase().includes(filters.search.toLowerCase()))
    )
    .sort((a, b) => 
      sortBy === 'date' 
        ? new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
        : a.company.localeCompare(b.company)
    );

  const statusColors: Record<JobStatus, string> = {
    applied: 'bg-blue-100 text-blue-800',
    interviewing: 'bg-yellow-100 text-yellow-800',
    offered: 'bg-purple-100 text-purple-800',
    rejected: 'bg-red-100 text-red-800',
    accepted: 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen bg-gray-50/80 backdrop-blur-sm">
      <ThreeBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BriefcaseIcon className="w-8 h-8 text-indigo-600" />
            Job Application Tracker
          </h1>
          <RouterLink
            to="/"
            className="flex items-center text-indigo-600 hover:text-indigo-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </RouterLink>
        </motion.div>

        <Statistics jobs={jobs} />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Company name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  value={newJob.position}
                  onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Job title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Job location"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={newJob.notes}
                  onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Add any notes about the application"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job URL</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={newJob.url}
                      onChange={(e) => setNewJob({ ...newJob, url: e.target.value })}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://example.com/job-posting"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., $80,000 - $100,000"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Application
              </button>
            </div>
          </form>
        </motion.div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search applications..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <SortAsc className="h-5 w-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'company')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="date">Sort by Date</option>
                  <option value="company">Sort by Company</option>
                </select>
              </div>
            </div>
          </div>

          <ul className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <motion.li
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">{job.company}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => addReminder(job.id, new Date().toISOString())}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <Mail className="h-5 w-5" />
                        </button>
                        <select
                          value={job.status}
                          onChange={(e) => updateStatus(job.id, e.target.value as JobStatus)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="applied">Applied</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offered">Offered</option>
                          <option value="rejected">Rejected</option>
                          <option value="accepted">Accepted</option>
                        </select>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{job.position}</p>
                    {job.location && (
                      <p className="mt-1 text-sm text-gray-500">{job.location}</p>
                    )}
                    {job.salary && (
                      <p className="mt-1 text-sm text-gray-500">Salary: {job.salary}</p>
                    )}
                    {job.notes && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <MessageSquare className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {job.notes}
                      </div>
                    )}
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {format(new Date(job.dateApplied), 'MMM d, yyyy')}
                      </div>
                      {job.url && (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-indigo-600 hover:text-indigo-900"
                        >
                          <Link className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          View Job Posting
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
            {filteredJobs.length === 0 && (
              <li className="p-6 text-center text-gray-500">
                No job applications found matching your filters.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}