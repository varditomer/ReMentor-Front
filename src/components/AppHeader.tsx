import { useLocation, useNavigate } from "react-router-dom"

export const AppHeader: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const isPageHome = location.pathname === '/'

    return (
        <header className={`app-header ${isPageHome ? '' : 'padding-small'}`}>
            <div className="logo" title="" onClick={() => navigate('/')}>
                <img src="src\assets\svgs\SiteLogo.svg" alt="" />
                <span className="txt">MentorStream</span>
            </div>
        </header>
    )
}
