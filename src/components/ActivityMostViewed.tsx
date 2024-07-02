import ActivityTitle from "./ActivityTitle";

const ActivityMostViewed = ({ metrics }: { metrics: any }) => {
  return (
    <div className="bg-base-300 w-full h-full rounded-box p-3 flex flex-col gap-3">
      <ActivityTitle text="Mais Visitados" />
      <div className="bg-base-200 rounded-box h-full p-3 max-h-[90%] xl:max-h-[93%]">
        <div className="overflow-x-auto max-h-full">
          <table className="table table-zebra table-pin-rows table-pin-cols">
            <thead className="font-bold">
              <tr className="text-base-content">
                <th>#</th>
                <th>Título</th>
                <th>Visualizações</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {metrics.mostViewedResources.map(
                (resource: any, index: number) => (
                  <tr key={index}>
                    <td className="font-bold">{index + 1}º</td>
                    <td>{resource.name}</td>
                    <td>{resource.views}</td>
                    <td>{resource.type}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityMostViewed;
