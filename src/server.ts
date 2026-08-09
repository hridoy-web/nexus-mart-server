import app from "./app.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Server Error:", error.message);
    } else {
      console.error("Server Error:", error);
    }
    process.exit(1);
  }
}

startServer();