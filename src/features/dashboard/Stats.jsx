import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  const numBookings = bookings?.length;

  const sales = bookings?.reduce((acc, curr) => acc + curr?.totalPrice, 0);

  const checkins = confirmedStays?.length;

  // num checkin nights / avail nights(num days * num cabins)
  const occupation =
    Math.round(
      (confirmedStays.reduce((acc, curr) => acc + curr?.numNights, 0) /
        (numCabins * numDays)) *
        100,
    ) + "%";
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupation}
      />
    </>
  );
}

export default Stats;
