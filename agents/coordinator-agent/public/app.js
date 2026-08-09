/* global document, fetch, console */
const agentSelect = document.getElementById("agent-select");
const promptInput = document.getElementById("prompt-input");
const runAgentButton = document.getElementById("run-agent-button");
const responseOutput = document.getElementById("response-output");

const environmentDisplay = document.getElementById("environment-display");

fetch("/api/environment")
  .then((response) => response.json())
  .then((data) => {
    environmentDisplay.textContent = `Environment: ${data.environment}`;
  });
  

runAgentButton.addEventListener("click", async () => {
    const selectedAgent = agentSelect.value;
    const prompt = promptInput.value.trim();

    if (!selectedAgent || !prompt) {
        responseOutput.textContent =
            "Please select an agent and enter a prompt.";
        return;
    }

    runAgentButton.disabled = true;
    runAgentButton.textContent = "Running...";
    responseOutput.textContent = "Executing agent...";

    try {
        const response = await fetch("/api/agents/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                agent: selectedAgent,
                prompt
            })
        });

        const data = await response.json();

        responseOutput.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error(error);

        responseOutput.textContent =
            `Unable to execute the agent: ${error.message}`;
    } finally {
        runAgentButton.disabled = false;
        runAgentButton.textContent = "Run Agent";
    }
});