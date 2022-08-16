import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FooterNav } from "../components/Footer/FooterNav";
import { PageLinkContext } from "../context/PageLinkContext";
import logo from "../assets/image/logo.png"
import { CartIcon, HomeIcon, MailIcon, MapPinIcon, PersonIcon, PhoneIcon, SearchIcon } from "../icons";
import { SiteDetailContext } from "../context/SiteDetailContext";
import { SocialIcon } from "react-social-icons";
import moment from "moment";
import { CategoryContext } from "../context/CategoryContext";
// import { EmailIcon } from "react-share";

export const Footer = () => {

    const { getLinks } = useContext(PageLinkContext);
    const { getSiteData } = useContext(SiteDetailContext);
    const { categories } = useContext(CategoryContext)
    const navigate = useNavigate();


    return (
        <>

            <footer class="footer p-10 flex flex-col md:flex-row  md:justify-around mt-20 bg-neutral text-neutral-content">
                <div className="flex flex-col">
                    <span class="footer-title">Store Information</span>
                    <div className="flex flex-row items-center">
                        <MapPinIcon className="w-4 h-4 mr-5" />
                        <div dangerouslySetInnerHTML={{ __html: getSiteData('site_address') }} />
                    </div>
                    <div className="flex flex-row">
                        <PhoneIcon className="w-4 h-4 mr-5" />
                        <div dangerouslySetInnerHTML={{ __html: getSiteData('contact') }} />
                    </div>
                    <div className="flex flex-row ">
                        <MailIcon className="w-4 h-4 mr-5" />
                        <div dangerouslySetInnerHTML={{ __html: getSiteData('email') }} />
                    </div>
                </div>

                <div className="flex flex-col">
                    <span class="footer-title">Categories</span>
                    {categories.loading ?
                        ''
                        :
                        categories.data.map((category, index) =>
                            <span class={""} onClick={e => {
                                navigate("?selectedCategory=" + category.id)
                            }} key={index} className={"capitalize cursor-pointer"}>
                                <a >{category.name}</a>
                            </span>
                        )

                    }
                </div>

                <div className="flex flex-col">
                    <span class="footer-title">Your account</span>
                    <Link to={"/user/profile"}>Profile</Link>
                    <Link to={"/user/orders"}>Orders</Link>
                    <Link to={"/user/addresses"}>Addresses</Link>
                    <Link to={"/user/wishlist"}>Wishlist</Link>
                    <Link to={"/user/reviews"}>My Reviews</Link>
                    <Link to={"/user/qas"}>My QAs</Link>
                </div>
                {/* <div className="w-full md:w-1/5 flex flex-row items-center justify-center">
                    <img src={logo} className="w-16" />
                    <div className="w-full text-left" dangerouslySetInnerHTML={{ __html: getSiteData('site_address') }}>
                    </div>
                </div> */}
                {/* <div className="grow"></div> */}

                <div className="flex flex-col">
                    <img src={logo} className="w-16" />
                    <span class="footer-title">Follow us</span>
                    <div class="grid grid-flow-col gap-4">
                        {
                            getSiteData('social_links') !== '' ?
                                JSON.parse(getSiteData('social_links')).map((item, index) =>
                                    <SocialIcon url={item.path} key={index} fgColor="white" style={{ width: "2.5rem", height: "2.5rem" }} />
                                )

                                : ''
                        }
                    </div>
                </div>
                {/* <div className="w-full md:w-1/5">

                    <div className="py-2">
                        
                    </div>

                    <div className="py-2">
                        <span class="footer-title">Contact Us</span>

                    </div>

                    <div className="py-2">
                        <span class="footer-title">Email</span>
                    </div>

                </div> */}
            </footer>
            {/* <hr className="bg-slate-500" /> */}
            {/* <div class="divider"></div> */}
            <div className="text-center py-2 bg-neutral text-neutral-content text-sm border-t border-gray-600">

                &copy; Gharagan {moment().format("Y")}
            </div>
            <FooterNav />
        </>
    );
}