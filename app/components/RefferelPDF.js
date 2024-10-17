import jsPDF from 'jspdf';

const PdfGenerator = ({ data, isAntenatal }) => {

  console.log(data);

  const handleGeneratePdf = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text('Doctor Referral', 20, 20);

    let referralData = [];

    if (isAntenatal) {
      referralData = [
        { label: 'Expected Date of Delivery', value: data.expectedDateOfDelivery },
        { label: 'Period of Gestational (POG)', value: data.pog },
        { label: 'Risk Factors', value: data.riskFactors.join(', ') },
      ];
    } else {
      referralData = [
        { label: 'Modes of Delivery', value: data.modes_of_delivery },
        { label: 'Birth Weight', value: data.birth_weight },
        { label: 'Postnatal Day', value: data.postnatal_day },
      ];
    }

    referralData = [
      { label: 'NIC', value: data.nic },
      { label: 'Name', value: data.name },
      { label: 'Date of birth', value: data.dob },
      { label: 'Antenatal or Postnatal', value: data.antenatalOrPostnatal },
      ...referralData,
      { label: 'Parity - Gravidity', value: data.parityGravidity ? 'Yes' : 'No' },
      { label: 'Parity - Parity', value: data.parityParity ? 'Yes' : 'No' },
      { label: 'Parity - Children', value: data.parityChildren ? 'Yes' : 'No' },
      { label: 'Reason for Request', value: data.reason_for_request },
      { label: 'Doctor Name', value: data.doctorName },
      { label: 'Channel Date', value: data.channelDate },
    ];

    // Add data as rows in the PDF
    let yOffset = 40;
    doc.setFontSize(12);

    referralData.forEach((item) => {
      doc.text(`${item.label}: ${item.value}`, 20, yOffset);
      yOffset += 10;
    });

    // Save the PDF
    doc.save('doctor-referral.pdf');
  };

  return (
    <div>
      <button
        type="button" // Prevents the button from having submit behavior
        onClick={handleGeneratePdf}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Print Doctor Referral
      </button>
    </div>
  );
};

export default PdfGenerator;
