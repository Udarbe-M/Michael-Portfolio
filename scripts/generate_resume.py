from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Michael-Udarbe-Resume.pdf"

NAVY = HexColor("#061725")
NAVY_2 = HexColor("#0A2A38")
TEAL = HexColor("#2AA895")
AMBER = HexColor("#D9822B")
INK = HexColor("#152A33")
MUTED = HexColor("#526B73")
LIGHT = HexColor("#D7E5E4")
PAPER = HexColor("#FAFCFB")


def wrap_text(text: str, font: str, size: float, max_width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_section_title(pdf: canvas.Canvas, title: str, y: float) -> None:
    pdf.setFillColor(TEAL)
    pdf.setFont("Helvetica-Bold", 8.5)
    pdf.drawString(42, y, title.upper())
    pdf.setStrokeColor(LIGHT)
    pdf.setLineWidth(0.7)
    pdf.line(42, y - 7, 570, y - 7)


def draw_project(
    pdf: canvas.Canvas,
    x: float,
    top: float,
    width: float,
    title: str,
    summary: str,
    technologies: str,
) -> None:
    pdf.setFillColor(NAVY_2)
    pdf.roundRect(x, top - 76, width, 76, 7, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#FFFFFF"))
    pdf.setFont("Helvetica-Bold", 9.2)
    pdf.drawString(x + 11, top - 17, title)
    pdf.setFillColor(HexColor("#C3D9D8"))
    pdf.setFont("Helvetica", 6.8)
    y = top - 30
    for line in wrap_text(summary, "Helvetica", 6.8, width - 22)[:3]:
        pdf.drawString(x + 11, y, line)
        y -= 8.4
    pdf.setFillColor(HexColor("#78D8C6"))
    pdf.setFont("Helvetica-Bold", 5.8)
    tech_line = technologies
    while stringWidth(tech_line, "Helvetica-Bold", 5.8) > width - 22 and " / " in tech_line:
        tech_line = tech_line.rsplit(" / ", 1)[0]
    pdf.drawString(x + 11, top - 66, tech_line.upper())


def build_resume() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter)
    pdf.setTitle("Michael O. Udarbe Jr. - Software Engineer")
    pdf.setAuthor("Michael O. Udarbe Jr.")
    pdf.setSubject("Software engineering resume")
    width, height = letter

    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, width, height, fill=1, stroke=0)
    pdf.setFillColor(NAVY)
    pdf.rect(0, height - 108, width, 108, fill=1, stroke=0)
    pdf.setFillColor(TEAL)
    pdf.rect(42, height - 78, 5, 41, fill=1, stroke=0)

    pdf.setFillColor(HexColor("#FFFFFF"))
    pdf.setFont("Helvetica-Bold", 21)
    pdf.drawString(59, height - 52, "MICHAEL O. UDARBE JR.")
    pdf.setFillColor(HexColor("#A8D8D1"))
    pdf.setFont("Helvetica", 10.5)
    pdf.drawString(59, height - 72, "SOFTWARE ENGINEER")

    contact_y = height - 93
    email = "michaeludarbe@yahoo.com"
    github = "github.com/Udarbe-M"
    pdf.setFillColor(HexColor("#D6E7E5"))
    pdf.setFont("Helvetica", 8)
    pdf.drawString(59, contact_y, email)
    email_width = stringWidth(email, "Helvetica", 8)
    pdf.linkURL(f"mailto:{email}", (59, contact_y - 2, 59 + email_width, contact_y + 9), relative=0)
    pdf.setFillColor(HexColor("#6DEBD2"))
    pdf.drawString(59 + email_width + 15, contact_y, github)
    github_width = stringWidth(github, "Helvetica", 8)
    pdf.linkURL("https://github.com/Udarbe-M", (59 + email_width + 15, contact_y - 2, 59 + email_width + 15 + github_width, contact_y + 9), relative=0)

    draw_section_title(pdf, "Core skills", 661)
    skill_lines = [
        ("SOFTWARE", "C++ / Python / Java / PHP / JavaScript / TypeScript / React Native / FastAPI / MySQL"),
        ("AI & VISION", "PyTorch / Keras / TensorFlow / Scikit-learn / Pandas / NumPy / OpenCV / MediaPipe / YOLO"),
        ("DELIVERY", "Docker / Git / GitHub Actions / REST APIs / Vercel / Supabase / CI/CD"),
    ]
    y = 641
    for label, value in skill_lines:
        pdf.setFillColor(AMBER)
        pdf.setFont("Helvetica-Bold", 6.7)
        pdf.drawString(42, y, label)
        pdf.setFillColor(MUTED)
        pdf.setFont("Helvetica", 7.2)
        pdf.drawString(103, y, value)
        y -= 15

    draw_section_title(pdf, "Selected projects", 590)
    draw_project(
        pdf, 42, 568, 255, "SureBall",
        "Basketball coaching app that analyzes video and returns scores, biomechanics, and actionable form feedback.",
        "React Native / FastAPI / MediaPipe / YOLOv11 / OpenCV",
    )
    draw_project(
        pdf, 315, 568, 255, "Grocery Manager",
        "Shelf-price OCR app with currency detection, editable quantities, and a running grocery total.",
        "Expo / React Native / TypeScript / OCR / ML Kit",
    )
    draw_project(
        pdf, 42, 482, 255, "Prescription Scheduler",
        "Medication companion for prescription scanning, human-reviewed extraction, pill stock, and local reminders.",
        "React Native / Expo / FastAPI / EasyOCR / TrOCR",
    )
    draw_project(
        pdf, 315, 482, 255, "NullPix",
        "AI image workspace for batch background removal, upscaling, object removal, and before-and-after review.",
        "Python / PyTorch / CUDA / BiRefNet / Real-ESRGAN",
    )

    draw_section_title(pdf, "Certifications", 382)
    certifications = [
        ("Oracle Cloud Infrastructure 2025 Certified Generative AI", "Oracle"),
        ("IT Specialist - Java", "Certiport"),
        ("IT Specialist - Python", "Certiport"),
        ("Project Management Ready", "PMI"),
        ("Open Science 101", "NASA"),
        ("Artificial Intelligence Fundamentals", "IBM SkillsBuild"),
        ("AI Fundamentals: Foundations for Understanding AI", "IBM SkillsBuild"),
        ("Getting Started with Artificial Intelligence", "IBM SkillsBuild"),
        ("Getting Started with Generative AI", "IBM SkillsBuild"),
        ("AI Literacy", "IBM SkillsBuild"),
        ("AI-Enabled Applications for Customer Service", "IBM SkillsBuild"),
    ]
    column_width = 250
    for index, (name, issuer) in enumerate(certifications):
        column = index % 2
        row = index // 2
        x = 42 + column * 273
        top = 355 - row * 25
        pdf.setFillColor(TEAL)
        pdf.circle(x + 3, top - 2, 2, fill=1, stroke=0)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 7.2)
        lines = wrap_text(name, "Helvetica-Bold", 7.2, column_width - 42)
        pdf.drawString(x + 12, top, lines[0])
        if len(lines) > 1:
            pdf.setFont("Helvetica", 6.7)
            pdf.drawString(x + 12, top - 8, lines[1])
            issuer_y = top - 16
        else:
            issuer_y = top - 9
        pdf.setFillColor(MUTED)
        pdf.setFont("Helvetica", 5.8)
        pdf.drawRightString(x + column_width, issuer_y, issuer.upper())

    draw_section_title(pdf, "Education", 198)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 10.5)
    pdf.drawString(42, 174, "Bachelor of Science in Computer Science - Software Engineering")
    pdf.setFillColor(TEAL)
    pdf.setFont("Helvetica-Bold", 7.2)
    pdf.drawRightString(570, 174, "2020 - PRESENT")
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 8)
    pdf.drawString(42, 158, "FEU Institute of Technology")
    pdf.setFont("Helvetica", 7)
    pdf.drawString(42, 143, "Applied focus: mobile development, computer vision, machine learning, and full-stack systems.")

    pdf.setStrokeColor(LIGHT)
    pdf.line(42, 54, 570, 54)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 6.3)
    pdf.drawString(42, 39, "Portfolio: michael-udarbe-portfolio.vercel.app")
    pdf.drawRightString(570, 39, "Rizal, Philippines")

    pdf.showPage()
    pdf.save()
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
