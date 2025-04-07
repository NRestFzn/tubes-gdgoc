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
  TableCaption,
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

//delete after initiate db
import dummyData from "../assets/dummy_data.json"

type Destination = {
  id: string;
  city: string;
  price: number;
  discount: number;
  country: string;
  rating: number;
  quota: number;
  created_at: string;
  updated_at: string;
};

export default function Page() {
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
            <div className="text-3xl font-bold transition-all duration-200 group-has-data-[collapsible=icon]/sidebar-wrapper:text-sm">
              Manage Destination
            </div>
          </div>
        </header>

        <Separator
          orientation="horizontal"
          className="data-[orientation=vertical]:h-4"
        />
        <div className="bg-muted/50 min-h-[100vh] flex-1 md:min-h-min p-4">
          <div className=" flex w-full max-w-sm items-center space-x-2 gap-2">
            <Input type="Search" placeholder="Search" />
            <Button variant="outline">+ Add Destination</Button>
          </div>
        </div>

        <div className="bg-muted/50 min-h-[100vh] flex-1 md:min-h-min p-4">
          <Card>
            <CardContent>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Quota</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(dummyData as Destination[]).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>{item.country}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.discount}%</TableCell>
                      <TableCell>{item.rating} ★</TableCell>
                      <TableCell>{item.quota}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="outline">Edit</Button>
                        <Button variant="destructive">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

      </SidebarInset>
    </SidebarProvider>

  )
}
