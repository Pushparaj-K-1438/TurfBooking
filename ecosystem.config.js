module.exports = {
  apps: [
    {
      name: "nextapp",
      script: "npm",
      args: "start",
      cwd: "/var/www/TurfBooking",
      env: {
        MONGODB_URI: "mongodb+srv://sanjuraj1438_db_user:uPoHTUGUOvKKKR63@cluster0.rwgdfnf.mongodb.net/TurfBooking?retryWrites=true&w=majority&appName=Cluster0",
        NEXTAUTH_SECRET: "KPQqtN4FlqLQW16JLSF/cLhYvGr2D4Kbip1aRVJGNIE=",
        NEXT_PUBLIC_API_URL: "http://91.108.111.40:3000/",
        NODE_ENV: "production"
      }
    }
  ]
};
