import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import Svg, { Path, Line, Circle, Text as SvgText, Defs, LinearGradient, Stop } from "react-native-svg";
import { ReferenceData } from "./types";
import { s } from "./moduleStyle";
import { sw } from "./responsive";

const PAD_LEFT   = 32;
const PAD_RIGHT  = 16;
const PAD_TOP    = 16;
const PAD_BOTTOM = 32;

function buildDistribution(scores: number[])
{
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const bucketCount = 12;
    const bucketSize = Math.ceil((max - min + 1) / bucketCount);

    const buckets = Array.from({ length: bucketCount }, (_, i) => {
        const bucketMin = min + i * bucketSize;

        return {
            label: bucketMin,
            count: scores.filter(s => s >= bucketMin && s < bucketMin + bucketSize).length
        };
    });
    return {
        buckets,
        min,
        bucketSize
    };
}

function interpolateY(points: { x: number; y: number }[], targetX: number): number
{
    if (points.length === 0) return PAD_TOP;
    if (targetX <= points[0].x) return points[0].y;
    if (targetX >= points[points.length - 1].x) return points[points.length - 1].y;

    for (let i = 1; i < points.length; i++)
    {
        const p0 = points[i - 1];
        const p1 = points[i];

        if (targetX >= p0.x && targetX <= p1.x)
        {
            const cpX = (p0.x + p1.x) / 2;
            let lo = 0, hi = 1;

            for (let iter = 0; iter < 50; iter++)
            {
                const mid = (lo + hi) / 2;
                const tm = 1 - mid;

                const xMid =
                    p0.x * tm * tm * tm +
                    3 * cpX * tm * tm * mid +
                    3 * cpX * tm * mid * mid +
                    p1.x * mid * mid * mid;

                if (xMid < targetX)
                {
                    lo = mid;
                }
                else
                {
                    hi = mid;
                }
            }

            const t = (lo + hi) / 2;
            const tm = 1 - t;
            return (
                p0.y * tm * tm * tm +
                3 * p0.y * tm * tm * t +
                3 * p1.y * tm * t  * t +
                p1.y * t  * t  * t
            );
        }
    }
    return points[points.length - 1].y;
}

interface Props
{
    myScore: number;
    mode: "easy" | "hard";
    referenceData: ReferenceData;
}

export default function ScoreGraph({ myScore, mode, referenceData }: Props)
{
    const { width: windowWidth } = useWindowDimensions();
    const GRAPH_WIDTH = windowWidth - sw(40) * 2;
    const GRAPH_HEIGHT = Math.round(GRAPH_WIDTH * 0.18);

    const scores = referenceData[mode];
    const {
        buckets,
        min,
        bucketSize
    } = buildDistribution(scores);

    const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const percentile = Math.round((scores.filter(s => s < myScore).length / scores.length) * 100);
    const maxCount = Math.max(...buckets.map(b => b.count));

    const plotW      = GRAPH_WIDTH  - PAD_LEFT - PAD_RIGHT;
    const plotH      = GRAPH_HEIGHT - PAD_TOP  - PAD_BOTTOM;
    const totalRange = buckets.length * bucketSize;

    const xForScore = (sc: number) => Math.min(Math.max(PAD_LEFT + ((sc - min) / totalRange) * plotW, PAD_LEFT), PAD_LEFT + plotW);
    const points = buckets.map((b, i) => ({
        x: PAD_LEFT + ((i + 0.5) / buckets.length) * plotW,
        y: PAD_TOP + plotH - (b.count / maxCount) * plotH,
    }));

    const pathD = points.reduce((acc, p, i) => {
        if (i === 0)
        {
            return `M ${p.x} ${p.y}`;
        }

        const prev = points[i - 1];
        const cpX = (prev.x + p.x) / 2;

        return acc + ` C ${cpX} ${prev.y} ${cpX} ${p.y} ${p.x} ${p.y}`;
    }, "");

    const areaD = pathD + ` L ${points[points.length - 1].x} ${PAD_TOP + plotH}` + ` L ${points[0].x} ${PAD_TOP + plotH} Z`;

    const myX = xForScore(myScore);
    const myY = interpolateY(points, myX);
    const avgX = xForScore(average);
    const labelAnchor = myX > GRAPH_WIDTH - 55 ? "end" : "start";
    const labelOffX = myX > GRAPH_WIDTH - 55 ? -10 : 10;

    return (
        <View style={s.graphCard}>
            <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
                <Defs>
                    <LinearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0%" stopColor="#51bdff" stopOpacity="0.25" />
                        <Stop offset="100%" stopColor="#51bdff" stopOpacity="0.02" />
                    </LinearGradient>
                </Defs>

                <Line x1={PAD_LEFT} y1={PAD_TOP + plotH} x2={PAD_LEFT + plotW} y2={PAD_TOP + plotH}
                      stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                {buckets.filter((_, i) => i % 3 === 0).map((b, i) => (
                    <SvgText key={i} x={PAD_LEFT + ((i * 3 + 0.5) / buckets.length) * plotW} y={PAD_TOP + plotH + 14}
                             fontSize="9" fill="rgba(255,255,255,0.3)" textAnchor="middle">{b.label}
                    </SvgText>
                ))}

                <Path d={areaD} fill="url(#areaGrad)" />
                <Path d={pathD} stroke="#51bdff" strokeWidth="2" fill="none" />

                <Line x1={avgX} y1={PAD_TOP} x2={avgX} y2={PAD_TOP + plotH}
                      stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4,3" />
                <SvgText x={avgX + 4} y={PAD_TOP + 10} fontSize="9" fill="rgba(255,255,255,0.4)">
                    moy. {average}
                </SvgText>

                <Line x1={myX} y1={PAD_TOP} x2={myX} y2={PAD_TOP + plotH}
                      stroke="#f39c12" strokeWidth="1.5" strokeDasharray="4,3" />

                <Circle cx={myX} cy={myY} r="9" fill="rgba(243,156,18,0.2)" />
                <Circle cx={myX} cy={myY} r="5" fill="#f39c12" />

                <SvgText x={myX + labelOffX} y={myY - 10} fontSize="10" fontWeight="700" fill="#f39c12" textAnchor={labelAnchor}></SvgText>
            </Svg>

            <View style={s.statsRow}>
                <View style={s.statBox}>
                    <Text style={s.statValue}>{percentile}%</Text>
                    <Text style={s.statLabel}>meilleur que</Text>
                </View>
                <View style={s.statDivider} />
                <View style={s.statBox}>
                    <Text style={s.statValue}>{average}</Text>
                    <Text style={s.statLabel}>moyenne</Text>
                </View>
                <View style={s.statDivider} />
                <View style={s.statBox}>
                    <Text style={s.statValue}>{myScore}</Text>
                    <Text style={s.statLabel}>ton score</Text>
                </View>
            </View>
        </View>
    );
}