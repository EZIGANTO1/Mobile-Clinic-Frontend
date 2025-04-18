import React from 'react';
import { useParams } from 'react-router-dom';


const departmentData = {
    pediatrics: {
      description: 'Pediatrics is the branch of medicine focused on the health and well-being of infants, children, and adolescents. Pediatricians specialize in diagnosing and treating childhood illnesses, ensuring healthy development, and guiding parents on preventive care and immunizations. They are also trained to manage behavioral and developmental disorders.',
      image: '/departments/pedia.jpg',
    },
    orthopedics: {
      description: 'Orthopedics deals with the diagnosis, treatment, and prevention of disorders of the bones, joints, muscles, ligaments, and tendons. This department provides care for conditions like fractures, arthritis, sports injuries, spinal problems, and congenital musculoskeletal issues. Orthopedic surgeons and specialists use both surgical and non-surgical methods to restore mobility and quality of life.',
      image: '/departments/ortho.jpg',
    },
    cardiology: {
      description: 'Cardiology focuses on the diagnosis and treatment of heart-related conditions. Cardiologists manage a range of cardiovascular diseases, including heart attacks, arrhythmias, heart failure, and hypertension. The department offers preventive care, diagnostics like ECG and echocardiograms, and advanced procedures such as angioplasty and cardiac catheterization.',
      image: '/departments/cardio.jpg',
    },
    neurology: {
      description: 'Neurology is dedicated to the diagnosis and treatment of disorders affecting the brain, spinal cord, and nervous system. Neurologists manage conditions such as epilepsy, stroke, multiple sclerosis, migraines, Parkinson’s disease, and neuropathy. The department emphasizes both acute and long-term neurological care and rehabilitation.',
      image: '/departments/neuro.jpg',
    },
    oncology: {
      description: 'Oncology specializes in the prevention, diagnosis, and treatment of cancer. The department provides comprehensive care through chemotherapy, radiation therapy, immunotherapy, and targeted drug treatments. Oncologists work closely with patients to offer personalized treatment plans and emotional support throughout their cancer journey.',
      image: '/departments/onco.jpg',
    },
    radiology: {
      description: 'Radiology uses advanced imaging technologies to diagnose and guide the treatment of various diseases. Radiologists perform and interpret X-rays, CT scans, MRIs, ultrasounds, and mammograms. This department plays a crucial role in early detection, surgical planning, and ongoing monitoring of many health conditions.',
      image: '/departments/radio.jpg',
    },
    physical_therapy: {
      description: 'Physical Therapy focuses on restoring mobility, reducing pain, and improving physical function through therapeutic exercises and manual techniques. It is commonly used for rehabilitation after injuries, surgeries, or strokes, and for managing chronic conditions like arthritis or back pain. Physical therapists develop personalized treatment plans to help patients regain strength and independence.',
      image: '/departments/therapy.jpg',
    },
    dermatology: {
      description: 'Dermatology addresses conditions related to the skin, hair, and nails. Dermatologists treat acne, eczema, psoriasis, fungal infections, skin cancer, and cosmetic concerns such as aging and pigmentation. The department also provides advanced dermatological procedures and skin screenings for early detection of diseases.',
      image: '/departments/derma.jpg',
    },
    ent: {
      description: 'ENT, or Otolaryngology, specializes in diagnosing and treating disorders of the ear, nose, throat, head, and neck. This includes hearing loss, sinusitis, tonsillitis, voice disorders, and balance issues. ENT specialists often perform surgical interventions like tonsillectomies, sinus surgeries, and cochlear implants when needed.',
      image: '/departments/ent.jpg',
    },
  };

const DepartmentDetails = () => {
  const { departmentName } = useParams();
  const department = departmentData[departmentName.toLowerCase()];

  if (!department) {
    return <h2>Department Not Found</h2>;
  }


  return (
    <div className="department-details" style={{ padding: "10rem" }}>
      <h1 style={{ textTransform: "capitalize" }}>{departmentName} Department</h1>
      <img
        src={department.image}
        alt={departmentName}
        style={{ width: "100%", maxWidth: "600px", borderRadius: "12px" }}
      />
      <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>{department.description}</p>
    </div>
  );
};


export default DepartmentDetails;
