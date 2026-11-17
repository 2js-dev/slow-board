package com.slowboard.global.health;

import java.time.LocalDateTime;

public record HealthResponse(
        String status,
        String database,
        LocalDateTime serverTime
) {
}
