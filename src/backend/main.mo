import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  let redemptions = Map.empty<Principal, Bool>();
  let validCode = "vakebtine";

  public shared ({ caller }) func redeemCode(code : Text) : async () {
    if (caller.isAnonymous() or code != validCode) {
      Runtime.trap("Invalid code or authentication");
    };
    if (redemptions.get(caller) == ?true) {
      Runtime.trap("Code already redeemed");
    };
    redemptions.add(caller, true);
  };

  public query ({ caller }) func hasRedeemedCode() : async Bool {
    switch (redemptions.get(caller)) {
      case (null) { false };
      case (?redeemed) { redeemed };
    };
  };
};
