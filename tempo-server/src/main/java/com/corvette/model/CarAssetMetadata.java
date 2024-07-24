package com.corvette.model;

public record CarAssetMetadata(String modelIdx, String color, String rimsIdx) {
    public String requestedFilename() {
        return modelIdx.concat("-").concat(color).concat("-").concat(rimsIdx);
    }
}
