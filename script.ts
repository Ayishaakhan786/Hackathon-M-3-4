declare const html2pdf : any;

const form = document.getElementById("resumeForm") as HTMLFormElement;
const container = document.getElementById("container") as HTMLElement;
const resumePage = document.getElementById("Resumepage") as HTMLElement;

const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
const resumeName = document.getElementById("resumefirstname") as HTMLElement;
const resumeLast = document.getElementById("resumeLastname") as HTMLElement;
const resumeAge = document.getElementById("resumeAge") as HTMLElement;
const resumeAddress = document.getElementById("resumeAddress") as HTMLElement;
const resumeEmail = document.getElementById("resumeemail") as HTMLElement;
const resumePhone = document.getElementById("resumephonenumber") as HTMLElement;
const resumeEducation = document.getElementById("resumeEducation") as HTMLElement;
const resumeYear = document.getElementById("resumeYear") as HTMLElement;
const resumeInstitute = document.getElementById("resumeInstitute") as HTMLElement;
const resumeSpecialization = document.getElementById("resumeSpecialization") as HTMLElement;
const resumeDetails = document.getElementById("resumeDetails") as HTMLElement;
const resumeSkills = document.getElementById("resumeSkills") as HTMLElement;
const resumeShare = document.getElementById("shareLinkButton") as HTMLButtonElement;
const resumeDownload = document.getElementById("DownloadResume") as HTMLButtonElement;
const resumeContent = document.getElementById("resumeContent") as HTMLElement;
const editButton = document.getElementById('editButton') as HTMLButtonElement;

form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const firstname = (document.getElementById("firstname") as HTMLInputElement).value;
    const lastname = (document.getElementById("lastname") as HTMLInputElement).value;
    const age = (document.getElementById("age") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement).value;
    const phone = (document.getElementById("phonenumber") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const degree = (document.getElementById("degree") as HTMLInputElement).value;
    const passingYear = (document.getElementById("passingyear") as HTMLInputElement).value;
    const institute = (document.getElementById("institutename") as HTMLInputElement).value;
    const specialization = (document.getElementById("specialization") as HTMLInputElement).value;
    const details = (document.getElementById("Details") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
    const photo = (document.getElementById("photo") as HTMLInputElement).files?.[0];

    if (photo) {
        const photoBase64 = await fileToBase64(photo);
        localStorage.setItem('resumePhoto',photoBase64);
        resumePhoto.src = photoBase64;
    }

    container.classList.add("hidden");
    resumePage.classList.remove("hidden");

    resumeName.textContent = firstname;
    resumeLast.textContent = lastname;
    resumeAge.textContent = `Age: ${age}`;
    resumeAddress.textContent = `Address: ${address}`;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.textContent = `Phone: ${phone}`;
    resumeEducation.textContent = `Degree: ${degree}`;
    resumeYear.textContent = `Year: ${passingYear}`;
    resumeInstitute.textContent = `Institute: ${institute}`;
    resumeSpecialization.textContent = `${specialization}`;
    resumeDetails.textContent = `Details: ${details}`;
    resumeSkills.textContent = `${skills}`;

    const queryParams = new URLSearchParams({
        name1: firstname,
        name2: lastname,
        age: age,
        address : address,
        phone: phone,
        email: email,
        degree: degree,
        passingYear: passingYear,
        institute: institute,
        specialized: specialization,
        details: details,
        skills: skills,
    });

    const URL = `${window.location.origin}? ${queryParams.toString()}`
    resumeShare.addEventListener('click',()=>{
        navigator.clipboard.writeText(URL);
        alert("The link is copied");
    });
    window.history.replaceState(null, " ", `?${queryParams.toString()}`);
});

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject("File reading error");
        reader.readAsDataURL(file);
    });
}
editButton.addEventListener('click', () => {
    updateFormFromResume();
    container.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
function updateFormFromResume() {
    (document.getElementById("firstname") as HTMLInputElement).value = resumeName.textContent || '';
    (document.getElementById("lastname") as HTMLInputElement).value = resumeLast.textContent || '';
    (document.getElementById("age") as HTMLInputElement).value = resumeAge.textContent?.replace("Age: ", "").trim() || '';
    (document.getElementById("address") as HTMLInputElement).value = resumeAddress.textContent?.replace("Address: ", "").trim() || '';
    (document.getElementById("email") as HTMLInputElement).value = resumeEmail.textContent?.replace("Email: ", "").trim() || '';
    (document.getElementById("phonenumber") as HTMLInputElement).value = resumePhone.textContent?.replace("Phone: ", "").trim() || '';

   (document.getElementById("degree") as HTMLInputElement).value = resumeEducation.textContent?.replace("Degree: ", "").trim() || '';
   (document.getElementById("passingyear") as HTMLInputElement).value = resumeYear.textContent?.replace("Year: ", "").trim() || '';
   (document.getElementById("institutename") as HTMLInputElement).value = resumeInstitute.textContent || '';
   (document.getElementById("specialization") as HTMLInputElement).value = resumeSpecialization.textContent || '';

   (document.getElementById("Details") as HTMLTextAreaElement).value = resumeDetails.textContent?.replace("Details: ", "").trim() || '';
   (document.getElementById("skills") as HTMLTextAreaElement).value = resumeSkills.textContent?.replace("Skills: ", "").trim() || '';
}
resumeDownload.addEventListener('click', () => {
    if (typeof html2pdf === 'undefined') {
        alert('Error: html2pdf library is not loaded');
        return;
    }
    const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'Resume.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 3 , useCORS: true},
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    const resumeElement = document.getElementById('resumeContent');
    if (resumeElement) {
    html2pdf()
        .set(options)
        .from(resumeElement)
        .save()
        .then(() => {
            console.log('PDF generated successfully');
        })        
        .catch((err: unknown) => console.error('Error downloading PDF:', err));
    } else {
        console.error('Resume content not found');
    }
});
window.addEventListener('DOMContentLoaded', () => {
    const Params = new URLSearchParams(window.location.search);
    const NAME = Params.get('firstname') || " ";
    const LASTNAME = Params.get('lastname') || " ";
    const EMAIL = Params.get('email') || " ";
    const AGE = Params.get('age') || " ";
    const ADDRESS = Params.get('address') || " ";
    const PHONE = Params.get('phonenumber') || " ";

    const DEGREE = Params.get('degree') || " ";
    const PASSINGYEAR = Params.get('passingyear') || " ";
    const INSTITUTE = Params.get('institutename') || " ";
    const SPECIALIZATION = Params.get('specialization') || " ";

    const DETAILS = Params.get('Details') || " ";
    const SKILLS = Params.get('skills') || " ";

if(NAME || LASTNAME || EMAIL || AGE || ADDRESS || PHONE || DEGREE || PASSINGYEAR || INSTITUTE || SPECIALIZATION || DETAILS || SKILLS){
    resumeName.textContent = NAME;
    resumeLast.textContent = LASTNAME;
    resumeAge.textContent = `Age: ${AGE}`;
    resumeAddress.textContent = `Address: ${ADDRESS}`;
    resumeEmail.textContent = `Email: ${EMAIL}`;
    resumePhone.textContent = `Phone: ${PHONE}`;
    resumeEducation.textContent = `Degree: ${DEGREE}`;
    resumeYear.textContent = `Year: ${PASSINGYEAR}`;
    resumeInstitute.textContent = `Institute: ${INSTITUTE}`;
    resumeSpecialization.textContent = `${SPECIALIZATION}`;
    resumeDetails.textContent = `${DETAILS}`;
    resumeSkills.textContent = `${SKILLS}`;

const savePhoto = localStorage.getItem('resumePhoto');
if(savePhoto){
    resumePhoto.src = savePhoto;
}
}
});
resumePhoto.style.width = '150px';
resumePhoto.style.height = '150px';
resumePhoto.style.display = 'block';
resumePhoto.style.margin = '0 auto';
resumePhoto.style.borderRadius = '50%';
resumePhoto.style.objectFit = 'cover';
 
 