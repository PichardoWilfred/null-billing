const { PDFDocument, rgb } = PDFLib;

export async function printInvoice({
  client,
  company,
  subtitle,
  typeDocument,
  developer,
  services,
  total,
}) {
  //Instanciating the fields & services array with the formData.
  const fields = [
    {
      name: "company_representative",
      value: client,
      weight: "regular",
    },
    {
      name: "company",
      value: company,
      weight: "bold",
    },
    {
      name: "company_description",
      value: subtitle,
      weight: "bold",
    },
    {
      name: "type",
      value: typeDocument,
      weight: "bold",
    },
    {
      name: "developer",
      value: developer,
      weight: "regular",
    },
    {
      name: "developer-position",
      value: "WEB DEVELOPER ",
      weight: "bold",
    },
  ];

  //getting the services data out of the form.
  const pdf_services = [];
  services.forEach(({ service, price }) => {
    pdf_services.push({ name: service, price: price });
  });

  //remains inside in order to not get overwritted again.
  const fonts = {
    black: "Montserrat-Black.ttf",
    bold: "Montserrat-Bold.ttf",
    light: "Montserrat-Light.ttf",
    regular: "Montserrat-Regular.ttf",
    semibold: "Montserrat-SemiBold.ttf",
    thin: "Montserrat-Thin.ttf",
  };

  // Fetch custom font
  const pdf_url =
    "http://127.0.0.1:9222/js/pdf-handling/template/templateform.pdf";
  const existingPdfBytes = await fetch(pdf_url).then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Register the `fontkit` instance
  pdfDoc.registerFontkit(fontkit);

  // Embed our custom font in the document
  for (let property in fonts) {
    const url = `http://127.0.0.1:9222/js/pdf-handling/fonts/${fonts[property]}`;
    const fontBytes = await fetch(url).then((res) => res.arrayBuffer());
    //Once we load the font, we re-assign them to its correspondant property.
    fonts[property] = await pdfDoc.embedFont(fontBytes);
  }

  const form = pdfDoc.getForm(); //pdfDoc forms

  //static fields
  addFields(fields, form, fonts);

  //services
  addServices(form, pdfDoc, pdf_services, fonts);
  console.log(total);
  addTotalandDate(total, fonts, form);

  const pdfBytes = await pdfDoc.save();

  // Downloading the document.
  download(pdfBytes, `${company}-bill.pdf`, "application/pdf");
}

const addFields = (fields, form, fonts) => {
  for (let { name, value, weight } of fields) {
    const field = form.getTextField(name);
    field.setText(value); //assigning value
    field.defaultUpdateAppearances(fonts[weight]); //assigning font
    field.enableReadOnly(); //disabling it
  }
};

const addTotalandDate = (amount, fonts, form) => {
  //total
  const total = form.getField("total");
  total.setText(amount);
  total.defaultUpdateAppearances(fonts["light"]);
  total.enableReadOnly();
  //date
  const date = form.getField("date");
  date.setText(getFormatedDate());
  date.defaultUpdateAppearances(fonts["light"]);
  date.enableReadOnly();
};
const addServices = (form, pdf, services, fonts) => {
  //starting coordinates
  let yCoord = 515;
  let xCoord = 56;
  //colors
  const white = rgb(1, 1, 1);
  const black = rgb(0, 0, 0);

  for (let { name, price } of services) {
    //service
    const serviceField = form.createTextField(name);
    serviceField.setText(name);
    serviceField.addToPage(pdf.getPages()[0], {
      x: xCoord,
      y: yCoord,
      width: 220,
      height: 17,
      textColor: white,
      backgroundColor: black,
      borderWidth: 0,
      fontSize: 30,
    });
    serviceField.defaultUpdateAppearances(fonts["bold"]);
    serviceField.enableReadOnly();
    pdf.getPages()[0].drawRectangle({
      x: xCoord, //This is the white square.
      y: yCoord + 20,
      width: 65,
      height: 3,
      color: white,
    });
    //price
    const priceField = form.createTextField(name + "-" + price);
    priceField.setText(price);
    priceField.addToPage(pdf.getPages()[0], {
      x: xCoord + 346,
      y: yCoord,
      width: 120,
      height: 15,
      textColor: white,
      backgroundColor: black,
      borderWidth: 0,
      fontSize: 30,
    });
    priceField.defaultUpdateAppearances(fonts["light"]);
    priceField.enableReadOnly();
    pdf.getPages()[0].drawText("$RD", {
      x: xCoord + (346 - 28), //a bit aside
      y: yCoord + 4,
      size: 11,
      color: white,
      font: fonts["bold"],
    });
    yCoord -= 50;
  }
};

const getFormatedDate = () => {
  const today = new Date();

  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
};
