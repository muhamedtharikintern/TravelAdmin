export const notifyCaptainsOfNewOrder = (io, connectedCaptains, order) => {
  const orderVehicle = order.vehicleType?.toLowerCase().trim();
  let sentCount = 0;

  for (const [captainId, captain] of Object.entries(connectedCaptains)) {
    const captainVehicle = captain.vehicleType?.toLowerCase().trim();

    if (captainVehicle === orderVehicle) {
      io.to(captain.socketId).emit("captain:new_order", {
        orderId: order._id,
        customerId: order.userId || order.customerId,
        pickupLocation: order.pickupLocation,
        dropLocation: order.dropLocation,
        vehicleType: order.vehicleType,
        amount: order.amount,
        distance: order.distance,
      });
      sentCount++;
      console.log(`✅ Sent to captain: ${captainId}`);
    } else {
      console.log(`❌ Skipped captain: ${captainId} | "${captainVehicle}" !== "${orderVehicle}"`);
    }
  }

  console.log(`📨 Order sent to ${sentCount} captain(s)`);
  return sentCount;
};