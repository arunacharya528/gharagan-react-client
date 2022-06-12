import { useContext } from "react";
import { Link } from "react-router-dom";
import { FooterNav } from "../components/Footer/FooterNav";
import { PageLinkContext } from "../context/PageLinkContext";
import logo from "../assets/image/logo.png"
import { CartIcon, HomeIcon, PersonIcon, SearchIcon } from "../icons";
import { SiteDetailContext } from "../context/SiteDetailContext";

export const Footer = () => {

    const { getLinks } = useContext(PageLinkContext);
    const { getSiteData } = useContext(SiteDetailContext);

    return (
        <>
            <footer class="footer p-10 flex flex-col md:flex-row bg-secondary/50 mt-20">
                <div className="w-full md:w-1/5 flex flex-col items-center justify-center">
                    <img src={logo} className="w-32" />
                    <div className="w-full text-left" dangerouslySetInnerHTML={{ __html: getSiteData('site_address') }}>
                    </div>
                </div>
                <div className="text-base-content w-full md:grow flex flex-row justify-between px-20">
                    <div className="flex flex-col space-y-2">
                        {
                            getLinks('left-foot').map((link, index) =>
                                <Link to={"/page/" + link['url-slug']} key={index} className="hover:text-accent">{link.name}</Link>
                            )
                        }
                    </div>
                    <div className="flex flex-col space-y-2">
                        {
                            getLinks('middle-foot').map((link, index) =>
                                <Link to={"/page/" + link['url-slug']} key={index} className="hover:text-accent">{link.name}</Link>
                            )
                        }
                    </div>
                    <div className="flex flex-col space-y-2">
                        {
                            getLinks('right-foot').map((link, index) =>
                                <Link to={"/page/" + link['url-slug']} key={index} className="hover:text-accent">{link.name}</Link>
                            )
                        }
                    </div>
                </div>
                <div className="w-full md:w-1/5">
                    <span class="footer-title">Social</span>
                    <div class="grid grid-flow-col gap-4">
                        {
                            getSiteData('social_links') !== '' ?
                                JSON.parse(getSiteData('social_links')).map((item, index) =>
                                    <a href={item.path} target="_blank" dangerouslySetInnerHTML={{ __html: item.svg }} alt={item.name}></a>
                                )

                                : ''
                        }
                    </div>
                </div>
            </footer>

            <FooterNav />
        </>
    );
}