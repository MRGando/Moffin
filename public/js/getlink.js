class linkup {
  constructor() { }

  //* link extractor method
  static ext_link(cls, linkName, options) {
    let text = document.querySelectorAll(cls);
    //* repeats the functionality for each of the containers
    text.forEach((item) => {
      const extract_link = (input, cls) => {
        const link = input.split(" ");
        let newLine = [];
        link.forEach((word) => {
          //* check if word includes any sign
          if (
            word.includes("http://") ||
            word.includes("https://") ||
            word.includes("www.") ||
            word.includes(".com") ||
            word.includes(".gov") ||
            word.includes(".co") ||
            word.includes(".style") ||
            word.includes(".ir") ||
            word.includes(".us")
          ) {
            let lastWord = word.split("");
            console.log(lastWord[lastWord.length - 1]);

            //* conditions for different endpoints
            let srcStart =
              options.src === true
                ? `<a href='http://${word}'>`
                : typeof options.src == "string"
                  ? `<a href='${options.src}'>`
                  : null;
            let srcEnd = `</a>`;

            newLine.push(
              `${options.src ? srcStart : null
              } <span href="google.com" class="${linkName}">${options.upperCase === true ? word.toUpperCase() : word
              }</span> ${options.src ? srcEnd : null}`
            );
          } else {
            newLine.push(word);
          }
        });

        let result = newLine.join(" ");
        console.log(result);
        return result;
      };
      //* printing result
      item.innerHTML = extract_link(item.innerHTML);
    });
  }
}

//* calling function
// linkup.ext_link(".check", "link", {
//   upperCase: false,
//   src: false,
// });

//* info
//* version 1.0.0 | date: 1401/05/28 | Developer: Rezakamali
