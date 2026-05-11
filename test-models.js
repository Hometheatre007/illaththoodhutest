const { GoogleGenerativeAI } = require('@google/generative-ai');

async function checkModel(modelId) {
  const genAI = new GoogleGenerativeAI("AIzaSyCDuK9N56buvD_G5Q4G_WtNbRLjMosenB8");
  try {
    const models = await genAI.getGenerativeModel({ model: modelId }).generateContent("Test");
    console.log(`✅ ${modelId} works!`, models.response.text().slice(0, 50));
  } catch (e) {
    console.log(`❌ ${modelId} failed:`, e.message.split('\n')[0]);
  }
}

async function run() {
  await checkModel("gemini-2.0-flash-lite");
  await checkModel("gemini-flash-lite-latest");
  await checkModel("gemma-3-1b-it");
  await checkModel("gemini-flash-latest");
  await checkModel("gemini-2.5-flash");
}
run();
