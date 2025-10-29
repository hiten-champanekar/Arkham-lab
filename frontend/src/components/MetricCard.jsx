import { motion } from "framer-motion";

const MetricCard = ({
  title,
  value,
  icon: Icon,
  color = "text-primary",
  bgColor = "bg-primary/10",
  subtitle,
  trend,
}) => {
  return (
    <motion.div
      className="dark:bg-black/30 bg-white/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-lg ${bgColor}`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <h3 className="text-sm font-medium dark:text-white/70 text-black/70 uppercase tracking-wide">
              {title}
            </h3>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-bold dark:text-white text-black">
              {typeof value === "number" ? value.toLocaleString() : value}
            </div>

            {subtitle && (
              <div className="text-sm dark:text-white/50 text-black/50">
                {subtitle}
              </div>
            )}

            {trend && (
              <div
                className={`text-xs font-medium ${
                  trend.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.isPositive ? "↗" : "↘"} {trend.value}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
