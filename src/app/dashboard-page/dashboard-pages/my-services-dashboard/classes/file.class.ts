export class FileClass {
  // formData: FormData();
  fromGroupToGroupData(formObject) {
    const formData = new FormData();
    console.log(formObject);
    // tslint:disable-next-line: forin
    for (const key in formObject) {
      formData.append(key, formObject[key]);
    }
    return formData;
  }
}
