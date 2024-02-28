import { GeldLogo } from "@/assets/logo";
import { Money } from "@/assets/money";
import { StepOne } from "@/assets/page1";

export default function Currencyselect() {
  return (
    <div>
      <div>
        <GeldLogo />
        <StepOne />
      </div>

      <div>
        <Money />
        <h1>Select Base Currency</h1>
      </div>
    </div>
  );
}
