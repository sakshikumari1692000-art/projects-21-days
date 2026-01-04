import React, { useEffect, useRef, useState } from "react";

const DragAndDrop = ({ data: intialData }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("tasks-data");
    if (savedData) {
      return JSON.parse(savedData);
    }
    return intialData;
  });

  useEffect(() => {
    localStorage.setItem("tasks-data", JSON.stringify(data));
  }, [data]);

  const mainHeadings = Object.keys(data); //["Office_Task","Home_Task","Sunday_Task"]

  const dragItem = useRef(); // This will store the information of the source task , idx , container
  const dragOverItem = useRef(); // This will store the information of the destination   heading , idx

  function handleStartDrag(e, task, heading, idx) {
    e.target.style.opacity = 0.5;
    dragItem.current = {
      task,
      heading,
      idx,
    };
  }

  function handleDragEnd(e) {
    e.target.style.opacity = 1;
  }

  function handleDragEnter(e, idx, heading) {
    dragOverItem.current = { idx, heading };
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop() {
    const source = dragItem.current;
    const dest = dragOverItem.current;

    if (!source || !dest) return null;

    setData((pre) => {
      // this means we are using drag and drop in same list
      if (source.heading == dest.heading) {
        const list = [...pre[source.heading]];
        const sourceIdx = source.idx;
        const destinationIdx = dest.idx;
        const [removedItem] = list.splice(sourceIdx, 1);
        list.splice(destinationIdx, 0, removedItem);

        return {
          ...pre,
          [source.heading]: list,
        };
      } else {
        const sourceList = [...pre[source.heading]];
        const detinationList = [...pre[dest.heading]];
        const sourceIdx = source.idx;
        const destinationIdx = dest.idx;
        const [removedItem] = sourceList.splice(sourceIdx, 1);
        detinationList.splice(destinationIdx, 0, removedItem);
        return {
          ...pre,
          [source.heading]: sourceList,
          [dest.heading]: detinationList,
        };
      }
    });
    dragItem.current = null;
    dragOverItem.current = null;
  }

  return (
    <div style={style.root}>
      {mainHeadings.map((heading) => {
        return (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={style?.container}
            key={heading}
          >
            <p style={style?.heading}>{heading.replace("_", " ")}</p>
            <div style={style.tasksContainer}>
              {data[heading].map((task, idx) => {
                return (
                  <div
                    onDragStart={(e) => {
                      handleStartDrag(e, task, heading, idx);
                    }}
                    onDragEnd={handleDragEnd}
                    onDragEnter={(e) => {
                      handleDragEnter(e, idx, heading);
                    }}
                    draggable
                    style={style.task}
                    key={task.id}
                  >
                    <p style={style.taskTitle}>{task.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DragAndDrop;

const style = {
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(307deg, rgb(254 219 219 / 0%), rgb(224, 242, 254))",
  },

  container: {
    width: "300px",
    minHeight: "520px",
    borderRadius: "22px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.7)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.08)",
    margin: "0 16px",
  },

  heading: {
    textAlign: "center",
    fontWeight: "700",
    padding: "14px",
    borderRadius: "16px",
    marginBottom: "16px",
    color: "#334155",
    background:
      "linear-gradient(135deg, rgb(251,207,232), rgb(191,219,254))",
    boxShadow: "0 8px 20px rgba(147,197,253,0.4)",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },

  tasksContainer: {
    flex: 1,
    borderRadius: "18px",
    padding: "14px",
    background: "linear-gradient(180deg, #f8fafc, #f1f5f9)",
    boxShadow: "inset 0 0 18px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  task: {
    padding: "16px",
    borderRadius: "18px",
    fontWeight: "600",
    color: "#0f172a",
    background:
      "linear-gradient(135deg, rgb(255,241,242), rgb(224,242,254))",
    boxShadow: "0 10px 25px rgba(147,197,253,0.35)",
    cursor: "grab",
    transition: "0.25s ease",
    textAlign: "center",
    border: "1px solid rgba(147,197,253,0.5)",
  },

  taskTitle: {
    margin: 0,
    letterSpacing: "0.4px",
  },
};






