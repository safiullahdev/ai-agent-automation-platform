const agentSelect = document.getElementById("agent-select");
const promptInput = document.getElementById("prompt-input");
const runAgentButton = document.getElementById("run-agent-button");
const responseOutput = document.getElementById("response-output");

runAgentButton.addEventListener("click", async () => {
    const selectedAgent = agentSelect.value;
    const prompt = promptInput.value.trim();

    if (!selectedAgent || !prompt) {
        responseOutput.textContent =
            "Please select an agent and enter a prompt.";
        return;
    }

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

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        responseOutput.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error(error);
        responseOutput.textContent = `Error: ${error.message}`;
    }
});