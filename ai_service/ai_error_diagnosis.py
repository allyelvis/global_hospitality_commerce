import openai

openai.api_key = "your_openai_api_key"

def ai_error_diagnosis(error_log):
    prompt = f"Analyze this error log and suggest fixes:\n\n{error_log}"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=200
    )
    return response.choices[0].text.strip()
