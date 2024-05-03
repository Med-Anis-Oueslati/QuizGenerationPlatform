import re
import PyPDF2
from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:5000'])
@app.route('/upload-pdf', methods=['POST'])
def upload_route():
    return upload_files()
# Configure upload directory (adjust as needed)
UPLOAD_FOLDER = 'files'  # Create this directory if it doesn't exist

# Function to handle file upload with security considerations
TARGET_DIR = 'C:\\Users\\Med Anis Oueslati\\Desktop\\flask storage'
def extract_sections(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        num_pages = len(reader.pages)

        sections = []
        current_section = {'title': None, 'paragraphs': []}

        for page_number in range(num_pages):
            page = reader.pages[page_number]
            text = page.extract_text()
            print(f"Page {page_number + 1} Text:")
            print(text)

            lines = text.split('\n')
            for line in lines:
                if line.strip() and line == line.upper():
                    if current_section['title']:
                        sections.append(current_section)
                    current_section = {'title': line.strip(), 'paragraphs': []}
                else:
                    current_section['paragraphs'].append(line.strip())

        if current_section['title']:
            sections.append(current_section)

    return sections
def remove_titles(paragraph):
    lines = paragraph.split('\n')
    cleaned_paragraphs = []
    for line in lines:
        if line.strip().startswith(('1', '2', '3', '4', '5', '6', '7', '8', '9', '0')) and not line.strip().endswith(('1', '2', '3', '4', '5', '6', '7', '8', '9', '0')):
            continue
        cleaned_paragraphs.append(line.strip())
    cleaned_paragraphs = '\n'.join(cleaned_paragraphs)
    return cleaned_paragraphs

    return cleaned_paragraphs

def delete_single_letter_lines(text):
    # Split the text into lines
    lines = text.split('\n')

    # Filter out lines with only one letter
    filtered_lines = [line for line in lines if len(line.strip()) > 1]

    # Join the filtered lines back into a single string
    filtered_text = '\n'.join(filtered_lines)

    return filtered_text

def split_paragraph(paragraph):
    # Split the paragraph into smaller paragraphs based on "."
    paragraphs = paragraph.split(".")

    # Remove any empty strings from the split result
    paragraphs = [p.strip() for p in paragraphs if p.strip()]

    return paragraphs
def upload_files():
    if request.method == 'POST':
        title = request.form['title']
        file = request.files['file']

        # Validate file presence
        if file and file.filename:
            filename = secure_filename(file.filename)  # Sanitize filename
            filepath = os.path.join(TARGET_DIR, filename)

            try:
                file.save(filepath)
                print (filepath)
                print(f"File '{filename}' uploaded successfully to '{filepath}'")
                sections = extract_sections(filepath)
           
                text = ""
                for section in sections:
                    for paragraph in section['paragraphs']:
                        cleaned_paragraphs = remove_titles(paragraph)
                        for paragraph in cleaned_paragraphs:
                            text += paragraph
                text = delete_single_letter_lines(text)
                
                smaller_paragraphs = split_paragraph(text)
                # Process the uploaded file here (optional)
                # ...

                return jsonify({"status": "ok"})
            except Exception as e:
                print(f"Error uploading file: {e}")
                return jsonify({"status": "error", "message": "Upload failed"}), 500
        else:
            return jsonify({"status": "error", "message": "No file selected"}), 400

    return jsonify({"status": "error", "message": "Method not allowed"}), 405  # Handle non-POST requests

# Example route to trigger upload_files function




if __name__ == '__main__':
    # Example usage
   
    

    app.run(debug=False)
