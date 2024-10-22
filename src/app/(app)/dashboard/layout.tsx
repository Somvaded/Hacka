import { ReactNode } from "react"
import DashboardSideBar from "./(components)/dashboardSidebar"
import DashboardTopNav from "./(components)/dashboardTopNav"
import { Poppins } from 'next/font/google'

export const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-poppins',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default async function DashboardLayout({ children }: { children: ReactNode }) {


	return (
		<div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-stone-100 text-black">
			<DashboardSideBar />
			<DashboardTopNav >
				<main className="flex flex-col gap-4 p-4 lg:gap-6" >
					<div className={poppins.className}>
						{children}
					</div>
				</main>
			</DashboardTopNav>
		</div>
	)
}