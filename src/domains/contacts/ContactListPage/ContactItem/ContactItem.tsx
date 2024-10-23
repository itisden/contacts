import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { type Contact } from "@/domains/contacts/types";
import { getInitials } from "@/domains/contacts/utils/contact";
import { Button } from "@/components/ui/button";
import { routes } from "@/router";
import DeleteContactAlert from "@/domains/contacts/ContactListPage/DeleteContactAlert";

type Props = {
  data: Contact;
  className?: string;
};

const ContactItem = ({ data, className }: Props) => {
  const initials = getInitials(data.fullName);

  return (
    <div
      className={cn(
        "flex flex-row rounded-md border p-4 hover:bg-slate-50",
        className,
      )}
    >
      <Avatar className="mr-4 grow-0">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="grow">
        <div className="flex w-full flex-row items-baseline">
          <span>{data.fullName}</span>
          <span className="ml-2 text-xs italic">{data.username}</span>
          <div className="ml-auto">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link to={routes.contact(data.id)}>
                <PencilIcon />
              </Link>
            </Button>
            <DeleteContactAlert contact={data}>
              <Button
                variant="outline"
                size="icon"
                className="ml-2 rounded-full"
              >
                <TrashIcon />
              </Button>
            </DeleteContactAlert>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">{data.phoneNumber}</div>
        <div className="text-sm text-muted-foreground">{data.email}</div>
      </div>
    </div>
  );
};

export default ContactItem;
