function Header() {
    return (
        <nav className="m-3">
            <ul className="nav justify-content-center nav-tabs" role="tablist ">
                <li className="nav-item" role="presentation ">
                    <a href="/" className="nav-link active" role="button">Inicio</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a href="/jugar" className="nav-link active " role="button">¡A jugar!</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a href="/info" className="nav-link active" role="button">¿Quienes somos?</a>
                </li>
            </ul>
        </nav>
    );
}

export default Header;