"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("resumeForm");
const container = document.getElementById("container");
const resumePage = document.getElementById("Resumepage");
const resumePhoto = document.getElementById("resumePhoto");
const resumeName = document.getElementById("resumefirstname");
const resumeLast = document.getElementById("resumeLastname");
const resumeAge = document.getElementById("resumeAge");
const resumeAddress = document.getElementById("resumeAddress");
const resumeEmail = document.getElementById("resumeemail");
const resumePhone = document.getElementById("resumephonenumber");
const resumeEducation = document.getElementById("resumeEducation");
const resumeYear = document.getElementById("resumeYear");
const resumeInstitute = document.getElementById("resumeInstitute");
const resumeSpecialization = document.getElementById("resumeSpecialization");
const resumeDetails = document.getElementById("resumeDetails");
const resumeSkills = document.getElementById("resumeSkills");
const resumeShare = document.getElementById("shareLinkButton");
const resumeDownload = document.getElementById("DownloadResume");
const resumeContent = document.getElementById("resumeContent");
const editButton = document.getElementById('editButton');
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phonenumber").value;
    const email = document.getElementById("email").value;
    const degree = document.getElementById("degree").value;
    const passingYear = document.getElementById("passingyear").value;
    const institute = document.getElementById("institutename").value;
    const specialization = document.getElementById("specialization").value;
    const details = document.getElementById("Details").value;
    const skills = document.getElementById("skills").value;
    const photo = (_a = document.getElementById("photo").files) === null || _a === void 0 ? void 0 : _a[0];
    if (photo) {
        const photoBase64 = yield fileToBase64(photo);
        localStorage.setItem('resumePhoto', photoBase64);
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
        address: address,
        phone: phone,
        email: email,
        degree: degree,
        passingYear: passingYear,
        institute: institute,
        specialized: specialization,
        details: details,
        skills: skills,
    });
    const URL = `${window.location.origin}? ${queryParams.toString()}`;
    resumeShare.addEventListener('click', () => {
        navigator.clipboard.writeText(URL);
        alert("The link is copied");
    });
    window.history.replaceState(null, " ", `?${queryParams.toString()}`);
}));
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
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
    var _a, _b, _c, _d, _e, _f, _g, _h;
    document.getElementById("firstname").value = resumeName.textContent || '';
    document.getElementById("lastname").value = resumeLast.textContent || '';
    document.getElementById("age").value = ((_a = resumeAge.textContent) === null || _a === void 0 ? void 0 : _a.replace("Age: ", "").trim()) || '';
    document.getElementById("address").value = ((_b = resumeAddress.textContent) === null || _b === void 0 ? void 0 : _b.replace("Address: ", "").trim()) || '';
    document.getElementById("email").value = ((_c = resumeEmail.textContent) === null || _c === void 0 ? void 0 : _c.replace("Email: ", "").trim()) || '';
    document.getElementById("phonenumber").value = ((_d = resumePhone.textContent) === null || _d === void 0 ? void 0 : _d.replace("Phone: ", "").trim()) || '';
    document.getElementById("degree").value = ((_e = resumeEducation.textContent) === null || _e === void 0 ? void 0 : _e.replace("Degree: ", "").trim()) || '';
    document.getElementById("passingyear").value = ((_f = resumeYear.textContent) === null || _f === void 0 ? void 0 : _f.replace("Year: ", "").trim()) || '';
    document.getElementById("institutename").value = resumeInstitute.textContent || '';
    document.getElementById("specialization").value = resumeSpecialization.textContent || '';
    document.getElementById("Details").value = ((_g = resumeDetails.textContent) === null || _g === void 0 ? void 0 : _g.replace("Details: ", "").trim()) || '';
    document.getElementById("skills").value = ((_h = resumeSkills.textContent) === null || _h === void 0 ? void 0 : _h.replace("Skills: ", "").trim()) || '';
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
        html2canvas: { scale: 3, useCORS: true },
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
            .catch((err) => console.error('Error downloading PDF:', err));
    }
    else {
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
    if (NAME || LASTNAME || EMAIL || AGE || ADDRESS || PHONE || DEGREE || PASSINGYEAR || INSTITUTE || SPECIALIZATION || DETAILS || SKILLS) {
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
        if (savePhoto) {
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
