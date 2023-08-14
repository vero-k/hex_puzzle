
export default function Header() {


  return (
    <>
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
                <div className="container-fluid">
                  <span className="navbar-brand">Cairo</span>
                  <ul className="nav justify-content-end">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
                    </li>
                  </ul>
                </div>
              </nav>
    </>
  )
}

