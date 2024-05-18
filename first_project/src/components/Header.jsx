import "./Header.css";

export default function Header( { setTab, tab }) {
    const handleClick = (e) => {
        setTab(e.target.textContent)
        console.log(e.target.textContent)
    }
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <a onClick={handleClick} href="#">Slider</a>
          </li>
          <li>
            <a onClick={handleClick} href="#">Class Component</a>
          </li>
          <li>
            <a onClick={handleClick} href="#">Function Component</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
