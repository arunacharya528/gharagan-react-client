import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPage } from "../adapters/page";
import { PageSkeleton } from "../components/Skeleton/PageSkeleton";
import { PageLinkContext } from "../context/PageLinkContext";
const moment = require('moment');

export const Page = () => {
    const [page, setPage] = useState({ loading: true, data: {} })
    const location = useLocation();
    const slug = location.pathname.split("/")[2]

    useEffect(() => {
        getPage(slug)
            .then(response => setPage({ loading: false, data: response.data }))
            .catch(error => console.log(error))
    }, [slug])

    const { pageLinks } = useContext(PageLinkContext);

    return (
        <>
            {
                page.loading ?
                    <PageSkeleton />
                    :
                    <div className="container mx-auto flex flex-col space-y-5 p-5">
                        <div className="bg-secondary/50 p-10 rounded-xl flex flex-col space-y-5">
                            <div className="text-2xl font-extrabold">{page.data.title}</div>
                            <div className="flex space-x-3">
                                <span>Created {moment(page.data.created_at).calendar()}</span>
                                <span>Updated {moment(page.data.created_at).calendar()}</span>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-5">
                            {/* <div className="w-1/5 bg-secondary/30 p-10 rounded-xl flex flex-col space-y-3">
                                {
                                    pageLinks.map((link, index) =>
                                        <Link to={"/page/" + link['url-slug']} key={index} className="hover:text-accent">{link.name}</Link>
                                    )
                                }
                            </div> */}

                            <div
                                dangerouslySetInnerHTML={{ __html: page.data.content }}
                                className="grow" />
                        </div>

                    </div>
            }
        </>
    );
}