import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import styles from '../styles/Users.module.css' 
import { SearchIcon } from "../components/SvgIcons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

//delete after initiate db
import dummyData from "../assets/dummy_user.json"

export default function User() {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(dummyData.length / itemsPerPage)
  const paginatedData = dummyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="group">

        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="text-[20px] font-bold transition-all duration-200 group-has-data-[collapsible=icon]/sidebar-wrapper:text-sm">
              Manage Users
            </div>
          </div>
        </header>

        <Separator
          orientation="horizontal"
          className="data-[orientation=vertical]:h-4"
        />
        <div className="bg-muted/50 flex md:min-h-min p-4">
          <div className=" relative flex w-full max-w-3xl items-center space-x-2 gap-2">
            <Input type="Search" placeholder="Search" className="pl-[40px]" />
            <SearchIcon className={styles.searchIcon}/>
            <Button variant="outline">+ Add User</Button>
          </div>
        </div>

        <div className="bg-muted/50 min-h-[100vh] flex-1 md:min-h-min p-4 pt-0">
          <Card>
            <CardContent>
              <Table className="w-full rounded-tr-lg rounded-tl-lg">
                <TableHeader className="bg-muted rounded-tl-lg rounded-tr-lg">
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.phone_number}</TableCell>
                      <TableCell>${item.email}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button className={styles.editButton} variant="outline">Edit</Button>
                        <Button className={styles.deleteButton} variant="destructive">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Separator
                orientation="horizontal"
                className=" mt-5 mb-5 data-[orientation=vertical]:h-4"
              />

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </div>

      </SidebarInset>
    </SidebarProvider>

  )
}
