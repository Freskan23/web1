document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.servicio, .area-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.servicio, .area-item').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // MODAL functionality
    const areaModal = document.getElementById('area-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModalBtn = areaModal ? areaModal.querySelector('.close-modal') : null;

    const areaDescriptions = {
        "Ansiedad": "La ansiedad es una respuesta natural ante situaciones de estrés o peligro, pero cuando se vuelve excesiva o persistente puede convertirse en un problema. En InSight te ayudamos a identificar los desencadenantes de tu ansiedad y desarrollar estrategias efectivas para manejarla.",
        "Obsesiones": "Las obsesiones son pensamientos, imágenes o impulsos recurrentes e intrusivos que causan malestar. Trabajamos para ayudarte a reconocer estos patrones obsesivos y desarrollar técnicas para reducir su impacto.",
        "Preocupaciones excesivas": "Cuando las preocupaciones ocupan gran parte de tu tiempo y energía, pueden afectar tu bienestar emocional y físico. Te ayudamos a gestionar estas preocupaciones mediante técnicas de relajación, reestructuración cognitiva y desarrollo de una perspectiva más equilibrada ante los problemas.",
        "Estrés": "El estrés crónico puede tener efectos negativos significativos en tu salud física y mental. En nuestro centro te ayudamos a identificar las fuentes de estrés en tu vida y desarrollar estrategias efectivas para reducirlo, mejorar tu resiliencia y recuperar tu equilibrio.",
        "Relaciones de dependencia": "Las relaciones de dependencia emocional pueden generar sufrimiento y limitar tu crecimiento personal. Te acompañamos en el proceso de construir relaciones más saludables, fortalecer tu autoestima y desarrollar tu autonomía emocional.",
        "Tristeza o Depresión": "La depresión se caracteriza por sentimientos persistentes de tristeza, pérdida de interés y energía. Ofrecemos un espacio seguro para explorar estos sentimientos, comprender sus causas y trabajar juntos hacia la recuperación de tu bienestar emocional.",
        "Duelo": "El proceso de duelo es una respuesta natural ante una pérdida significativa. Te acompañamos respetuosamente en este camino, ayudándote a procesar tus emociones, honrar tu pérdida y adaptarte gradualmente a la nueva realidad.",
        "Vacío existencial": "El vacío existencial puede manifestarse como una sensación de falta de sentido o propósito en la vida. Trabajamos contigo para explorar tus valores, reconectar con lo que es importante para ti y construir una vida con mayor significado personal.",
        "Gestión emocional": "Aprender a identificar, comprender y regular nuestras emociones es fundamental para nuestro bienestar. Te proporcionamos herramientas prácticas para mejorar tu inteligencia emocional y responder de manera más adaptativa a los desafíos cotidianos.",
        "Habilidades sociales": "Las habilidades sociales nos permiten conectar efectivamente con los demás, expresar nuestras necesidades y establecer límites saludables. Te ayudamos a desarrollar estas habilidades para mejorar tus relaciones interpersonales y sentirte más seguro en entornos sociales.",
        "Comunicación y asertividad": "La comunicación asertiva implica expresar tus pensamientos, sentimientos y necesidades de manera clara y respetuosa. Trabajamos contigo para mejorar tus habilidades comunicativas, ayudándote a expresarte con confianza y establecer relaciones más satisfactorias.",
        "Miedos sobre tu salud": "Los miedos relacionados con la salud pueden generar preocupación constante y comportamientos de comprobación. Te ayudamos a comprender el origen de estos miedos y desarrollar una relación más equilibrada con tu cuerpo y tu salud.",
        "Fobias": "Las fobias son miedos intensos y específicos que pueden limitar significativamente tu vida. Utilizamos técnicas eficaces para ayudarte a enfrentar gradualmente estos miedos, reducir tu ansiedad y recuperar tu libertad.",
        "Sentimiento de Soledad": "El sentimiento de soledad puede surgir incluso estando rodeados de personas. Trabajamos contigo para explorar las causas de esta soledad, mejorar tu conexión contigo mismo y con los demás, y desarrollar relaciones más significativas."
    };

    const serviceDescriptions = {
        "Psicólogo online desde Valladolid": "La terapia online te permite acceder a atención psicológica profesional desde cualquier lugar. Beneficios: comodidad, ahorro de tiempo, accesibilidad y misma efectividad.",
        "Psicólogos para adultos en Valladolid": "En InSight Psicología ayudamos a adultos a enfrentar diversos desafíos emocionales y psicológicos. Nuestro enfoque se adapta a cada persona, proporcionando herramientas específicas para mejorar tu bienestar.",
        "Terapia familiar y de pareja en Valladolid": "Las relaciones familiares y de pareja pueden atravesar momentos difíciles que requieren ayuda profesional. En InSight ofrecemos terapia especializada para mejorar la comunicación, reducir conflictos y fortalecer vínculos.",
        "Psicólogo infantil y adolescente en Valladolid": "Los niños y adolescentes se enfrentan a desafíos únicos durante su desarrollo. Nuestro equipo está especializado en proporcionar apoyo psicológico adaptado a cada etapa evolutiva.",
        "Terapia grupal en Valladolid": "La terapia grupal ofrece un espacio compartido donde personas con experiencias similares pueden encontrar apoyo mutuo bajo la guía profesional. Beneficios: sentirte comprendido, aprender de otros y desarrollar habilidades sociales."
    };

    function showAreaModal(title, description, useHtml = false) {
        if (!areaModal) return;
        modalTitle.textContent = title;
        if (useHtml) {
            modalDescription.innerHTML = description;
        } else {
            modalDescription.textContent = description;
        }
        areaModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Click handlers
    document.querySelectorAll('.area-item').forEach(item => {
        item.addEventListener('click', function() {
            const areaText = this.textContent.trim();
            showAreaModal(areaText, areaDescriptions[areaText] || "Contáctanos para más información sobre este tratamiento.");
        });
    });

    document.querySelectorAll('.servicio').forEach(item => {
        item.addEventListener('click', function() {
            const serviceTitle = this.querySelector('h3') ? this.querySelector('h3').textContent.trim() : this.textContent.trim();
            showAreaModal(serviceTitle, serviceDescriptions[serviceTitle] || "Contáctanos para más información sobre este servicio.", true);
        });
    });

    // Close modal
    if (closeModalBtn) {
        closeModalBtn.onclick = function() {
            areaModal.style.display = 'none';
            document.body.style.overflow = '';
        };
    }
    
    window.addEventListener('click', function(e) {
        if (areaModal && e.target === areaModal) {
            areaModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});