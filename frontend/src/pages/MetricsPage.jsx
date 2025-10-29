import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Code2,
  FileText,
  MessageSquare,
  CheckCircle,
  TestTube,
  BookMarked,
  List,
  TrendingUp,
  Calendar,
  Award,
  Activity,
} from "lucide-react";
import { useMetricsStore } from "../store/useMetricStore";
import MetricCard from "../components/MetricCard";
import MetricChart from "../components/MetricChart";
import { Loader } from "../components/Loader";

const MetricsPage = () => {
  const { metrics, isLoading, error, fetchMetrics } = useMetricsStore();

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="dark:text-white/70 text-black/70">{error}</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold dark:text-white text-black mb-2">
            No Data
          </h2>
          <p className="dark:text-white/70 text-black/70">
            No metrics data available
          </p>
        </div>
      </div>
    );
  }

  const { overview, breakdowns, recentActivity, topUsers, trends } = metrics;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold dark:text-white text-black mb-2 flex items-center gap-3">
            <Activity className="w-8 h-8 text-primary" />
            Arkham Labs Metrics
          </h1>
          <p className="dark:text-white/70 text-black/70 text-lg">
            Comprehensive analytics and insights for your coding platform
          </p>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value={overview.totalUsers}
            icon={Users}
            color="text-blue-500"
            bgColor="bg-blue-500/10"
            subtitle="Registered vigilantes"
          />

          <MetricCard
            title="Total Problems"
            value={overview.totalProblems}
            icon={Code2}
            color="text-green-500"
            bgColor="bg-green-500/10"
            subtitle="Coding challenges"
          />

          <MetricCard
            title="Total Submissions"
            value={overview.totalSubmissions}
            icon={FileText}
            color="text-purple-500"
            bgColor="bg-purple-500/10"
            subtitle="Code attempts"
          />

          <MetricCard
            title="Success Rate"
            value={`${overview.successRate}%`}
            icon={CheckCircle}
            color="text-emerald-500"
            bgColor="bg-emerald-500/10"
            subtitle="Accepted solutions"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Discussions"
            value={overview.totalDiscussions}
            icon={MessageSquare}
            color="text-yellow-500"
            bgColor="bg-yellow-500/10"
            subtitle="Community threads"
          />

          <MetricCard
            title="Test Cases"
            value={overview.totalTestCases}
            icon={TestTube}
            color="text-pink-500"
            bgColor="bg-pink-500/10"
            subtitle="Executed tests"
          />

          <MetricCard
            title="Revisions"
            value={overview.totalRevisions}
            icon={BookMarked}
            color="text-indigo-500"
            bgColor="bg-indigo-500/10"
            subtitle="Study materials"
          />

          <MetricCard
            title="Playlists"
            value={overview.totalPlaylists}
            icon={List}
            color="text-orange-500"
            bgColor="bg-orange-500/10"
            subtitle="Curated collections"
          />
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold dark:text-white text-black mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Recent Activity (Last 7 Days)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="New Users"
              value={recentActivity.newUsers}
              icon={Users}
              color="text-blue-400"
              bgColor="bg-blue-400/10"
            />

            <MetricCard
              title="New Submissions"
              value={recentActivity.newSubmissions}
              icon={FileText}
              color="text-green-400"
              bgColor="bg-green-400/10"
            />

            <MetricCard
              title="New Problems"
              value={recentActivity.newProblems}
              icon={Code2}
              color="text-purple-400"
              bgColor="bg-purple-400/10"
            />

            <MetricCard
              title="New Discussions"
              value={recentActivity.newDiscussions}
              icon={MessageSquare}
              color="text-yellow-400"
              bgColor="bg-yellow-400/10"
            />
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MetricChart
            type="pie"
            data={breakdowns.problemsByDifficulty.map((item) => ({
              name: item.difficulty,
              count: item.count,
            }))}
            title="Problems by Difficulty"
          />

          <MetricChart
            type="pie"
            data={breakdowns.submissionsByLanguage.map((item) => ({
              name: item.language,
              count: item.count,
            }))}
            title="Submissions by Language"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <MetricChart
            type="bar"
            data={breakdowns.submissionsByStatus.map((item) => ({
              name: item.status,
              count: item.count,
            }))}
            title="Submissions by Status"
          />
        </div>

        {/* Top Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="dark:bg-black/30 bg-white/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold dark:text-white text-black mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Top Performers
          </h2>

          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 dark:bg-black/20 bg-white/20 rounded-lg border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white text-black">
                      {user.name}
                    </h3>
                    <p className="text-sm dark:text-white/60 text-black/60">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold dark:text-white text-black">
                    {user.acceptedSubmissions}
                  </div>
                  <div className="text-sm dark:text-white/60 text-black/60">
                    Accepted Solutions
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MetricsPage;
