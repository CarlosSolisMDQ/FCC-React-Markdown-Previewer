let sample = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
>Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;
marked.setOptions({
  breaks: true });


const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};




class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: sample };

    this.handleChange = this.handleChange.bind(this);

  }


  handleChange(event) {
    this.setState({
      input: event.target.value });

  }



  render() {

    let clean = DOMPurify.sanitize(this.state.input);
    clean = clean.replace(/&gt;+/g, '>');
    let preview = { __html: marked(clean, { renderer: renderer }) };
    console.log(preview);



    return React.createElement("div", { class: "row" },
    React.createElement("div", { id: "div1", class: "col" },
    React.createElement("h1", null, "Texto"),
    React.createElement("hr", null),
    React.createElement("textarea", { type: "text", id: "editor", value: this.state.input, onChange: this.handleChange })),


    React.createElement("div", { id: "div2", class: "col" },
    React.createElement("h1", null, "Markdown"),
    React.createElement("hr", null),
    React.createElement("main", { id: "preview", dangerouslySetInnerHTML: preview })));


  }}


ReactDOM.render(React.createElement(Previewer, null), document.getElementById('main'));

/*
                                                                                        bien, rejunté todo en un solo componente y puse un filtro de input (purify) como sugiere Marked. Los ultimos problemas fueron que no me reconocia los quotes y buscando encontre dos soluciones, aportarle a cada tag html problematico un css acorde para que renderizaran bien y ".replace(/&gt;+/g, '>')"
                                                                                        
                                                                                        en el github de Marked el usuario leoyli escribió: "Check the data string first to see if it > rather than /&gt;. If your input is from server, it is possible to get /&gt;+ instead. In that case, just replace your string using .replace(/&gt;+/g, '>') before put it into marked()"
                                                                                        
                                                                                        lo hice y santo remedio.
                                                                                        
                                                                                        */