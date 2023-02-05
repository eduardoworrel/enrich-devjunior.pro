public class ClosedEvidences {
    public int Id { get; set; }
    public int JobId { get; set; }
    public int CountIsClosed { get; set; }
    public ActualStatus ActualStatus { get; set; }
    public bool PossiblyClosed { get; set; }
}

public enum ActualStatus {
    Open,
    Closed
}