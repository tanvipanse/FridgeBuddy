import Link from 'next/link';

export type ButtonLinkProps = {
    href:string,
    children:string
}

export function ButtonLink({href, children}:ButtonLinkProps) {
    return (
        <Link href={href}>
            <button>{children}</button>
        </Link>
    );
}