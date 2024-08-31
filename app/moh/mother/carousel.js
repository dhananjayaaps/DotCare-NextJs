import React, { useState } from 'react';

const Carousel = () => {
  const medicalCases = [
    { title: 'July 1, 2024', details: [
      { label: 'Doctor:', value: 'Dr. Smith' },
      { label: 'Type:', value: 'Routine check-up' },
      { label: 'Findings:', value: 'Everything looks normal. Advised on prenatal care and upcoming tests.' },
    ]},
    { title: 'July 15, 2024', details: [
      { label: 'Doctor:', value: 'Dr. Brown' },
      { label: 'Type:', value: 'Ultrasound' },
      { label: 'Findings:', value: 'Healthy fetal growth observed. Estimated weight and measured heartbeat.' },
    ]},
    { title: 'July 29, 2024', details: [
      { label: 'Doctor:', value: 'Dr. Green' },
      { label: 'Type:', value: 'Blood tests and vitamins' },
      { label: 'Findings:', value: 'Prescribed prenatal vitamins. Blood test results normal.' },
    ]},
    { title: 'August 12, 2024', details: [
      { label: 'Doctor:', value: 'Dr. White' },
      { label: 'Type:', value: 'Fetal development monitoring' },
      { label: 'Findings:', value: 'Normal development progress. Discussed baby\'s movements and growth milestones.' },
    ]},
    { title: 'August 26, 2024', details: [
      { label: 'Doctor:', value: 'Dr. Blue' },
      { label: 'Type:', value: 'Gestational diabetes screening' },
      { label: 'Findings:', value: 'No signs of diabetes detected. Blood sugar levels within healthy range.' },
    ]},
    { title: 'September 9, 2024', details: [
      { label: 'Doctor:', value: 'Dr. Black' },
      { label: 'Type:', value: 'Routine check-up and flu shot' },
      { label: 'Findings:', value: 'Administered flu shot. Discussed upcoming delivery and birth plan.' },
    ]},
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? Math.ceil(medicalCases.length / 3) - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === Math.ceil(medicalCases.length / 3) - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full max-w-full mx-auto mt-8">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
          {medicalCases.map((caseItem, index) => (
            <div key={index} className="min-w-1/3 max-w-md flex-shrink-0 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-teal-600 font-bold text-xl">{caseItem.title}</div>
                <div className="mt-4">
                  {caseItem.details.map((detail, idx) => (
                    <div key={idx} className="text-gray-700">
                      <span className="font-semibold">{detail.label}</span>: {detail.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
