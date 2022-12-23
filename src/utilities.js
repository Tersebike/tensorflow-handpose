const fingerJoints= {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
}


export const drawHand = (locations, ctx) => {
  if (locations.length > 0) {
    locations.forEach((location) => {
      const { landmarks } = location;
      const fingerArray = Object.keys(fingerJoints);
      for (let j = 0; j < fingerArray.length; j++) {
        let finger = fingerArray[j];
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = 'plum';
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }
      for (let i = 0; i < landmarks.length; i++) {
        ctx.beginPath();
        ctx.arc(landmarks[i][0], landmarks[i][1], 5, 0, 3 * Math.PI);
        ctx.fillStyle = 'indigo';
        ctx.fill();
      }
    })
  }
}